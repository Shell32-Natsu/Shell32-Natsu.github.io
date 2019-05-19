---
title: Invoke Jenkins Jobs from BitBucket Server by Webhook
date: 2019-05-19 13:28:30
tags:
 - Jenkins
 - BitBucket
 - 配置
categories:
 - 备忘
---

I just added unit tests and am planning to add functional test scripts to one of my project. What comes to your mind when you work on a project every day, already have had test scripts and there is a Jenkins server available? Right, automate it!

My compay uses BitBucket server. However, although there are several BitBucket server plugins [available](https://marketplace.atlassian.com/search?product=bitbucket&query=jenkins), all of them are not free (and they are even not cheap!). So far, I just want to invoke a Jenkins job when some events happen. Should we pay thousands of dollars for such a easy (relatively) use case? So I decide to find some free alternatives.

<!-- more -->

# Webhook

[Webhook](https://en.wikipedia.org/wiki/Webhook) is a very convenient feature. It's very simple. Just send a HTTP request to a URL when an event occurs. Fortunately, BitBucket server support Webhook [natively](https://confluence.atlassian.com/bitbucket/manage-webhooks-735643732.html), which means you don't need to install a plugin.

![Imgur](https://i.imgur.com/1aSNdLN.png)

It's very easy to configure a Webhook. Just follow the documentations.

# Jenkins

You need two plug-ins on Jenkins:

## Generic Webhook Trigger Plugin

You need this plug-in to parse the payload in the POST body sent by BitBucket.

BitBucket will send a POST request to the URL you set. The information is a JSON object in the body. Jenkins cannot parse the JSON object in the body so we need this plug-in.

![](https://i.imgur.com/SuT3V5I.png)

After intalling *Generic Webhook Trigger Plugin*, You should set the Webhook URL to `{JENKINS SERVER}/generic-webhook-trigger/invoke`. 

For more information, see [here](https://wiki.jenkins.io/display/JENKINS/Generic+Webhook+Trigger+Plugin).

## Bitbucket (Stash) Notifier Plugin

After a Jenkins job finishes, you definitely want to get a notification. Sure, you can choose to send an email to the author or the code reviewer of the pull request. But there is a better way. BitBucket can accept the build status by a REST API (well, another Webhook). This plug-in is used to send this request.

![](https://i.imgur.com/uRbOz7b.png)

Note that this plug-in only supports username/password credentials but you can use [personal access token](https://confluence.atlassian.com/bitbucketserver/personal-access-tokens-939515499.html) to secure your password.

When a job finishes, a build status icon will show beside the commit message and pull request if there is one.

![](https://i.imgur.com/TWXsFzV.png)

![](https://i.imgur.com/adNJCz0.png)
