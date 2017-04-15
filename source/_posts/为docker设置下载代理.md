---
title: 为Docker设置下载代理
url: 1175.html
id: 1175
categories:
  - Docker
date: 2017-03-18 18:16:34
tags:
  - Docker
  - 备忘
---

今天装Docker，在下载image的时候总是链接被重置，用Proxychain也没法代理。通过Google找到[https://stackoverflow.com/questions/23111631/cannot-download-docker-images-behind-a-proxy/28093517#28093517](https://stackoverflow.com/questions/23111631/cannot-download-docker-images-behind-a-proxy/28093517#28093517)，官方文档地址：[https://docs.docker.com/engine/admin/systemd/#http-proxy](https://docs.docker.com/engine/admin/systemd/#http-proxy) 。通过配置文件来指定http代理。

具体步骤如下：

1.  在`/etc/systemd/system`目录下创建`docker.service.d`目录
2.  在`docker.service.d`目录中创建文件`http-proxy.conf`文件
3.  在配置文件中添加：
```
[Service]
Environment="HTTP_PROXY=http://proxy.example.com:80/"
```
4. 可以使用`NO_PROXY`变量指定不走代理的地址：
```
Environment="NO_PROXY=localhost,127.0.0.0/8,docker-registry.somecorporation.com"
```

5. 运行`sudo systemctl daemon-reload`更新设置
6. 使用`systemctl show --property=Environment docker`来查看设置是否生效
```
Environment=HTTP_PROXY=http://proxy.example.com:80/
```
7. 重启Docker：`sudo systemctl restart docker`

我的系统是Ubuntu 16.04，用ss-qt来科学上网，代理服务器的地址填写ss的地址就可以了。要注意ss应设置为http代理而不是socks5。