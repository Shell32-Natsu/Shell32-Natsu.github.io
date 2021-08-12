
---
title: '使用阿里云函数+SSH Reverse Tunnel实现Socks代理'
tags:
- Go
- 工具
- 备忘
- 网络
- Docker
- serverless
categories:
- Study
date: 2021-08-12 19:04:25
---

这次试验受到油猴脚本“解除B站区域限制”所使用的在阿里云用[云函数搭建B站反向代理](https://github.com/ipcjs/bilibili-helper/blob/user.js/packages/unblock-area-limit/README.md#3-%E9%98%BF%E9%87%8C%E4%BA%91%E5%87%BD%E6%95%B0%E8%AE%A1%E7%AE%97)、以及[awslambdaproxy](https://github.com/dan-v/awslambdaproxy)项目启发，使用阿里云函数+Custom Container实现Socks代理。

本文默认读者已经有一定的公有云平台/阿里云以及Linux系统和Docker使用经验，并且已经拥有可以部署云函数的阿里云账号。本文不会详细解释阿里云的使用细节，关于如何部署/管理阿里云资源请参考阿里云文档。

**注意⚠️：笔者在此只简述工作原理及搭建简易POC，不保证任何可靠性及安全性。限于笔者的水平有限，文中不免出现错误，请不吝指出。**

**使用阿里云免费额度一定要注意，由于本文所述的云函数几乎是一直运行，因此极其容易被反薅羊毛。**

<!-- more -->

# How does it work?

## 直接搭建正向代理的局限性

一般的代理工具的工作方式一般被称为“正向代理”（有别于“反向代理”），在不考虑某些特殊的隐蔽流量的需求的情况下，常用的正向代理方式有http/https/socks。使用云函数搭建http代理非常简单，基本是开箱即用，因为http代理作为一个中间人可以完全获得http请求的内容，然后根据header中host的值直接进行转发。https代理，或者是基于http的隧道，都需要代理服务器支持`connect`方法，而云函数运行在一个类似API网关的反向代理后面，该API网关与云函数之间不使用标准http请求通信，也同样不转发`connect`请求，因此难以实现此种代理。

由于云函数所在的网络结构，类似于一个位于防火墙或者NAT网关之后的主机：可以与外部建立TCP连接但是不能监听外部连接请求。因此在这种情况下常用的反向SSH隧道便可以派上用场。

## 使用反向SSH隧道

SSH客户端和服务端提供了方便的端口转发（port forwarding）功能，利用其提供的反向隧道（reverse SSH tunnel）功能，我们可以在云函数所在的主机（下称主机A）向一台外部主机（下称主机B）发起SSH连接并使用[`-R`](https://man.openbsd.org/ssh#R~5)选项来把远程主机的端口转发到本地主机端口，同时在本地使用SSH启动一个socks5代理，把端口转发的本地端口设置为socks代理的监听端口，这样就实现了`外部主机B <--> 外部主机B隧道监听端口 <--> 云函数主机A本地端口 <--> 云函数主机A socks 代理`的代理转发流程。

# How to do it?

## 准备工作

 - 阿里云账号
 - 一台有公网IP的主机（主机B），笔者使用的是一台VPS

## 步骤

### 在主机A上启动SSH Server 

出于安全和方便起见，笔者没有直接使用VPS上运行的SSH Server，而是选择启动一个Docker容器专门用于SSH Server，基于以下两点理由：

1. VPS使用公钥认证，从主机A登录到主机B需要在主机A上存储私钥，作为云服务商，相信阿里云提供了相应的密钥管理服务，但是因为笔者使用的是阿里云免费额度所以想要尽量减少使用的资源。
2. Docker提供的相对隔离的环境对部署来说更加方便。

笔者使用Docker镜像`linuxserver/openssh-server`启动SSH Server

```bash
sudo docker run -d \
 --name=openssh-server \
 -e PUID=1000 \
 -e PGID=1000 \
 -p 10241:2222 \
 -e PASSWORD_ACCESS=true \
 -e USER_PASSWORD=${PASSWORD} \
 -e USER_NAME=proxy \
 --restart unless-stopped \
 -v $(pwd)/88-enable_tunnels:/etc/cont-init.d/88-enable_tunnels \
 linuxserver/openssh-server
```

`linuxserver/openssh-server`镜像默认监听`2222`端口，笔者选择了对外暴露`10241`端口。注意选项`-v $(pwd)/88-enable_tunnels:/etc/cont-init.d/88-enable_tunnels`，该init脚本是为了在openssh-server中启用隧道功能，该功能默认是禁用的。`88-enable_tunnels`文件内容如下：

``` bash
#!/usr/bin/with-contenv bash

echo Enabling Tunneling
sed -i 's@#PermitTunnel no@PermitTunnel yes@' /etc/ssh/sshd_config
sed -i 's@AllowTcpForwarding no@AllowTcpForwarding yes@' /etc/ssh/sshd_config
```

注意笔者在本文中全部使用密码验证，如上所述这主要是为了方便起见，如果需要更高安全性可以换成密钥认证。

### 构建云函数Custom Container

阿里云函数支持自定义Docker Image，这给了我们极大的方便。

首先我们要基于`alpine`镜像，安装必要的程序：

```Dockerfile
FROM alpine:latest
RUN apk add openssh sshpass
```

其中`sshpass`是为了能够在脚本中传入SSH密码。

接下来修改镜像中的`sshd_config`文件，之所以要修改是因为我们除了要在容器中连接主机B以外，还要创建一个本地的socks连接，所以主机A也要能够接受SSH连接。

```Dockerfile
RUN sed -i 's/#PasswordAuthentication/PasswordAuthentication/' /etc/ssh/sshd_config
RUN sed -i 's/#PermitEmptyPasswords\ no/PermitEmptyPasswords\ yes/' /etc/ssh/sshd_config
RUN sed -i 's/#PermitRootLogin\ prohibit-password/PermitRootLogin\ yes/' /etc/ssh/sshd_config
RUN sed -i 's/AllowTcpForwarding\ no/AllowTcpForwarding\ yes/' /etc/ssh/sshd_config
RUN ssh-keygen -A
```

然后我们就可以开始建立SSH连接了，在镜像中加入一个脚本`start-tunnel.sh`:

```bash
#! /bin/sh

# 启动sshd
/usr/sbin/sshd

PASSWORD="$1"
REMOTE_HOST="$2"
REMOTE_PORT="$3"
SLEEP_SEC="$4"

# 创建本地socks代理
sshpass \
 -p 'haha' \
 sh -c 'ssh -f -N -D 54321 -4 \
 -o GlobalKnownHostsFile=/dev/null \
 -o UserKnownHostsFile=/dev/null \
 -o StrictHostKeyChecking=no \
 127.0.0.1 && \
 sleep .1'

# 创建反向隧道
sshpass \
 -p "$PASSWORD" \
 sh -c "ssh \
 -o GlobalKnownHostsFile=/dev/null \
 -o UserKnownHostsFile=/dev/null \
 -o StrictHostKeyChecking=no \
 $REMOTE_HOST \
 -p $REMOTE_PORT \
 -R 127.0.0.1:6666:127.0.0.1:54321 \
 -f -N && \
 sleep .1"

# 保持运行
echo "sleeping $SLEEP_SEC..."
sleep $SLEEP_SEC
echo "exit"
```

可以看到，主机B的`6666`端口被转发到了主机A的`54321`端口，而主机A的`54321`端口就是socks代理的监听端口。关于脚本中的ssh命令选项在此就不赘述了。不过有一点需要注意的是，使用`sshpass`搭配ssh端口转发会导致ssh client开启转发后立刻退出，因为使用`sh -c ... sleep .1`来避免这个问题。

把这个文件复制到镜像中：

```Dockerfile
COPY start-tunnel.sh .
```

接下来是最后一个问题，阿里云函数在运用Custom Container的时候，默认通过`9000`端口传入参数，因为我们的镜像也必须有一个HTTP服务器监听`9000`端口。好在用Go语言写起来很容易：

```Go
package main

import (
 "fmt"
 "net/http"
 "time"
)

func hello(w http.ResponseWriter, req *http.Request) {
 // 请求返回后这次函数调用就会视为结束，因此要block在这里以保持容器运行
 time.Sleep(595 _config.yml image package-lock.json package.json scaffolds scripts source themes time.Second)
 fmt.Fprintf(w, "hello\n")
}

func main() {
 http.HandleFunc("/", hello)
 http.ListenAndServe(":9000", nil)
}
```

在Dockerfile中构建`server`：

```Dockerfile
FROM golang:1.16-alpine AS build
WORKDIR /app
COPY server.go .
RUN GO111MODULE=off go build -o /server
...
COPY --from=build /server /server
EXPOSE 9000
```

最后运行`docker build`和`docker push`把镜像push到阿里云的镜像仓库。

### 创建云函数

在阿里云的控制台创建一个云函数并选择使用我们push的Custom Container，选择128MB内存的弹性实例（实际上笔者实测容器只用了<10MB的内存）。在`Command`中填上`["sh", "start-tunnel.sh", "PASSWORD", "user@Host_A_IP", "Host_A_Port", "TIMEOUT"]`。`TIMEOUT`要配合函数配置，以及之前脚本中的时间（笔者选择10min）。然后创建一个每10min运行一次的定时触发器。这样就可以让容器**几乎**一直运行。

### 正向隧道

完成了以上步骤，主机B已经可以使用主机A作为代理了。作为客户端，我们还要创建一个客户端主机（C）到主机B的正向隧道，以便在本地使用socks代理。

```bash
ssh $HOST -p $PORT -L 0.0.0.0:8086:127.0.0.1:6666 -N
```

这条命令把主机C的8086端口转发到了主机B的6666端口，这样我们就可以在本地使用主机C的8086端口作为socks代理了。

```bash
$ curl -x 'socks5://localhost:8086' https://api.myip.com
{"ip":"47.102.125.165","country":"China","cc":"CN"}
```
