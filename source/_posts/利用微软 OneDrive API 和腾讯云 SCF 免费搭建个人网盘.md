---
title: 利用微软 OneDrive API 和腾讯云 SCF 免费搭建个人网盘
author: ShmilyXI
avatar: https://cdn.jsdelivr.net/gh/ShmilyXI/Gallerys@master/NoteImage/1055543572.jpeg
authorLink: "http://www.shmilyxy.cn"
categories: 技术
comments: true
date: 2019-11-17 20:02:59
authorAbout:
authorDesc:
tags: 分享
keywords: OneDrive5T
description: 利用教育邮箱免费获取onedrive 5T存储空间
photos: https://cdn.jsdelivr.net/gh/ShmilyXI/Gallerys@master/image/QQ20200605-120124@2x.png
---

## SCF 简介

 腾讯云云函数（Serverless Cloud Function，SCF）是腾讯云为企业和开发者们提供的无服务器执行环境，帮助您在无需购买和管理服务器的情况下运行代码，是实时文件处理和数据处理等场景下理想的计算平台。

您只需使用 SCF 平台支持的语言编写核心代码并设置代码运行的条件，即可在腾讯云基础设施上弹性、安全地运行代码。

无服务器（Serverless）不是表示没有服务器，而表示当您在使用 Serverless 时，您无需关心底层资源，也无需登录服务器和优化服务器，只需关注最核心的代码片段，即可跳过复杂的、繁琐的基本工作。核心的代码片段完全由事件或者请求触发，平台根据请求自动平行调整服务资源。

Serverless 拥有近乎无限的扩容能力，空闲时，不运行任何资源。代码运行无状态，可以轻易实现快速迭代、极速部署。

腾讯云 SCF 目前仍在 [公测](https://cloud.tencent.com/document/product/583/17299) 阶段，所有用户可免费使用，结束日期待定。公测结束后，每月仍可享受足量的[免费资源使用量和免费调用次数](https://cloud.tencent.com/document/product/583/12282)，但收取 `外网出流量` 费用。


| 资源类型   | 每月免费额度 |
|------------|--------------|
| 资源使用量 | 40 万 GBs    |
| 调用次数   | 100 万次     |

所谓外网出流量，即程序通过 SCF 访问外部网络的流量，对于本程序即请求微软 API 的流量，每次调用从几 B 到几 KB 不等；文件上传下载直接与微软交互，不经过 SCF。

下图（老图可能与描述不符）是我一天的使用量，大概调用了 10000 次，如果是 30 天就是 30 万次，还不到免费额度的 1/3。资源使用量 1000 GBs，30 天就是 3 万 GBs，远低于 40 万 GBs。外网出流量 0.05G ，一个月大概是 1.5 G，按照 [正式收费标准](https://cloud.tencent.com/document/product/583/12281) 0.8 元 / G，每月要支付 1.2 元的出流量费用，完全可以接受（目前不会收取）。

![](https://img13.360buyimg.com/img/jfs/t1/80717/30/8984/127477/5d6be0f4E2d3ddd41/affd65fa8e220bf2.png)

## 获取 Onedrive 账号

既然是利用 Onedrive，首先要获取一个账号，支持个人、企业和教育版。

获取方式： [免费获得 OneDrive 5T 网盘及正版 Office 365 授权](http://shmilyxy.cn/2019/11/17/%E5%85%8D%E8%B4%B9%E8%8E%B7%E5%BE%97OneDrive%205T%E7%BD%91%E7%9B%98%E5%8F%8A%E6%AD%A3%E7%89%88Office%20365%E6%8E%88%E6%9D%83/)

## 创建函数服务

有了账号后就可以创建函数了。登录 [腾讯云 SCF 控制台](https://console.cloud.tencent.com/scf/list)（在此之前要完成腾讯云 [实名认证](https://cloud.tencent.com/document/product/378/10495)），点击左侧菜单栏的 `函数服务`，接着点击顶栏的地区选择下拉框，选择 `香港`，因为大陆区域在绑定域名时需要备案，如果你拥有已备案的域名，则可以选择国内，当然不绑定域名也可以使用。接着点击蓝色的 `新建` 按钮，创建函数。

![](https://img12.360buyimg.com/img/jfs/t1/78335/19/8782/41051/5d6b779bEd3525463/c193a7a039e82f6e.png)

随后在新建函数页面填写 `函数名称`，名字随意；`运行环境` 选择 `Php 7.2`；创建方式 选择 模板函数；选择 `helloworld 模板`，最后点击最下方的 `下一步`。进入 `② 函数配置` 页面后不做任何修改，直接点击 `完成。`

![](https://img11.360buyimg.com/img/jfs/t1/67123/11/8810/58169/5d6b7c32E1b6db7b4/aac10c9eab43d942.png)

## 上传函数代码

下载并解压 [OneDrive_SCF](https://github.com/vcheckzen/OneDrive_SCF/archive/master.zip)。随后，进入 SCF `函数代码` 面板，将 `提交方法下拉框` 的值改为 `本地上传文件夹`，随后点击 `上传`，选择 `解压好的文件夹`，最后点击 `保存`。注意，解压后查看一下是否包含两层文件夹，如果是，上传内层。

![](https://img11.360buyimg.com/img/jfs/t1/62901/35/8995/35468/5d6b7f28Eeff3c58a/1d30dd4b9ce9d475.png)

## 添加触发方式

进入函数服务的 `触发方式` 面板，点击 `添加触发方式`。选择触发方式下拉框中的 `API网关触发器`，勾选下方的 `启用集成响应`，点击 `保存`。

![](https://img14.360buyimg.com/img/jfs/t1/83154/3/8875/52837/5d6b92e5E4b004249/7cbe89ce911aff9f.png)

稍等片刻，下方会出现一个 `访问路径`，点击打开它。

![](https://img10.360buyimg.com/img/jfs/t1/40554/26/13645/35452/5d6b9534E00ac9179/b2977f4e630803b3.png)

## 获取并填写 refresh_token

页面加载完毕后，点击其中的 `Get a refresh_token`，在打开的微软账号登录页面中，填写你的 `Onedrive 账号和密码`，完成登录。

![](https://img10.360buyimg.com/img/jfs/t1/49067/32/9406/43409/5d6b9617Eeacb072b/2c65ab509bb73465.png)

登录完毕后浏览器将跳转回上面的页面，此时修改网址，从左往右找到第一个 `?`，将其 `删除`。再找到第一个 `&`，将其改为 `?`，注意要使用英文输入法。下面是修改前后的网址对比：

```js
https://.../?authorization_code&code=...
https://.../authorization_code?code=...
```

修改完毕后直接回车，稍等片刻页面将返回 `refresh_token`，复制它备用。

![](https://img14.360buyimg.com/img/jfs/t1/56678/37/9552/59863/5d6b977cE8dd2360f/220f0d790f980277.png)

进入 SCF `函数代码` 面板，选中 `index.php`，将得到的 `refresh_token` 粘贴进，下图所示的单引号之间，最后点击靠近左下方的 `保存。`

![](https://img10.360buyimg.com/img/jfs/t1/74544/37/8955/122226/5d6b8a38Ea6142e2b/7e313a3752a4fb9b.png)

## 配置环境变量

进入 `函数配置` 面板，点击靠近右上角的 `编辑` 按钮。

![](https://img10.360buyimg.com/img/jfs/t1/55934/31/9306/24352/5d6b82a6E03751d6d/22346a7906fb4afb.png)

在新面板中，将 `内存` 修改为 `512M`，当然 `64M` 也是可以运行的，需要说明的是，内存越大可用的免费时长越少；`超时时间` 填写 `30`，随后添加几个 `环境变量`，它们的功能如下：

| 名称         | 含义           | 备注                                             | 示例         |
|--------------|----------------|--------------------------------------------------|--------------|
| sitename     | 站点名称       | 无                                               | 我的网盘     |
| public_path  | 要展示的根路径 | 无                                               | /            |
| private_path | 要展示的根路径 | 使用自定义域名时必须设置                         | /            |
| imgup_path   | 图床路径       | 其他网页可以引用上传的图片                       | / 图床       |
| passfile     | 密码文件名称   | 在某目录下添加该文件，里面写入密码即可加密文件夹 | password.txt |
| admin        | 管理员密码     | 管理员登录后功能更多                             | 1234         |

![](https://img13.360buyimg.com/img/jfs/t1/82068/38/8844/46527/5d6b82a8E2b44d81d/3424a3797211a478.png)

所有信息填写完毕后点击保存，刷新 `函数 API 网关访问路径`，即可访问你的 `Onedrive `网盘。

![](https://img10.360buyimg.com/img/jfs/t1/49705/38/9495/37688/5d6b9886Ec0e6f171/119cbeef724cd5c7.png)

## 自定义域名（可选）
进入函数服务的 `触发方式` 面板，点击打开 `SCF_API_SERVICE。`

![](https://img14.360buyimg.com/img/jfs/t1/58938/40/9235/37925/5d6b9a15E2a329579/a6ff29214e8578c4.png)

打开服务界面的 `自定义域名` 面板，点击 `新建`。

![](https://img14.360buyimg.com/img/jfs/t1/75575/7/8907/25412/5d6b9a89E17359d86/9386a93623c95d9b.png)

在添加域名对话框中，填写你的 `域名`，`协议` 选择 `http`，如果你想使用 h`ttps`，则必须在腾讯云 [申请或上传 SSL 证书](https://cloud.tencent.com/document/product/400/6814)，如果你已经在其他平台申请过推荐直接上传，因为申请一般要等待数小时才能完成。未进行上述操作你看到的 `证书下拉框` 里将会是`无`。网络类型勾选 `外网`。选择 `自定义路径映射`，添加一条记录，路径为 `/`，指向 `发布`环境。

![](https://img12.360buyimg.com/img/jfs/t1/82337/2/9023/40411/5d6de694E29a550dc/a06d1420f6bdf47e.png)

打开你的域名解析服务商控制台，在域名解析列表里添加一条 [CNAME 记录](https://cloud.tencent.com/document/product/302/3450)，值便是图中上方的 `外网二级域名`。最后点击 `提交`。

进入 `管理 API` 面板，点击 `编辑`。

![](https://img12.360buyimg.com/img/jfs/t1/75724/35/9137/30365/5d6de5bbEbebf6709/ecf9149ecd869df3.png)

在 `前端配置` 面板中，将路径改为 `/`，点击下一步。

![](https://img11.360buyimg.com/img/jfs/t1/81276/18/9151/53670/5d6de5bdE22b67bd0/f9323a6cca49f732.png)

在 `后端配置` 中，保证已勾选 `启用集成响应` 后点击 下一步。

![](https://img11.360buyimg.com/img/jfs/t1/77289/11/9087/26551/5d6de5c2Eaf31705b/5950b12c8261ecd7.png)

在 `响应结果` 面板，将 `返回类型` 改为 `HTML`，点击 `完成`。

![](https://img12.360buyimg.com/img/jfs/t1/49932/13/9445/26534/5d6de5c4Eaa7582f4/7efa4f81442852c7.png)

在弹出的对话框中，点击 `前往发布服务`。

![](https://img14.360buyimg.com/img/jfs/t1/77585/36/9012/22830/5d6de5c6Ea2ee3023/70320d81116e8c26.png)

在 `服务信息` 面板，点击靠近 `右上角` 的 `发布` 按钮。

![](https://img12.360buyimg.com/img/jfs/t1/72692/38/9030/27078/5d6de5c8E56e8d3f7/37da68d26c44f8d1.png)

在弹出的 `发布服务` 对话框中，将 `发布环境` 改为 `发布`，`备注` 随意填写，最后点击 `提交`。

![](https://img12.360buyimg.com/img/jfs/t1/49295/10/9605/23935/5d6de5caE43782e1b/f1b36f0d54f8277b.png)

现在就可以通过自定义域名访问你的网盘了。


## 使用 Github Pages 缩短长链接（可选）
如果你没有域名和服务器，可以通过 `Github Pages` 跳转的方式，适当缩短首次访问的路径长度，最终可以通过 `username.github.io` 打开你的网盘。

注册并登录 [Github](https://github.com/join)，随后打开 [该仓库](https://github.com/vcheckzen/redirect)，点击靠近右上角的 `Fork`。稍等片刻，打开页面中部的 `index.html`。

![](https://img13.360buyimg.com/img/jfs/t1/81433/29/9011/43730/5d6ba364E8bfbcab9/922db430228cc015.png)

点击靠近 `右上角` 的 `铅笔` 按钮，编辑该文件。

![](https://img12.360buyimg.com/img/jfs/t1/48643/27/9492/22737/5d6decd0E59609187/345f9d14fe3de9d1.png)

将你的 `函数 API 网关访问路径` 替换到文件中。

![](https://img12.360buyimg.com/img/jfs/t1/82296/16/7071/26718/5d6ba424Eeb8963e6/75e9725b397a3b7d.png)

修改完毕后点击靠近页面最下方的 `Commit changes`。

![](https://img13.360buyimg.com/img/jfs/t1/46300/14/9374/21791/5d6ba442E58d82ba6/72e92de2f4ad12f1.png)

点击靠近右上角的 `Settings`，将 R`epository name` 改成 `你的 Github 用户名.github.io`，随后点击 `Rename`。

![](https://img12.360buyimg.com/img/jfs/t1/73876/14/8917/49824/5d6ba654E9c44470a/539d599e20d5e705.png)

下拉该页面，找到 `Github Pages`，将 `Source` 下拉框的值改成 `master branch`，如果没有则无需修改。

![](https://img12.360buyimg.com/img/jfs/t1/43663/2/13575/33132/5d6ba655E9e64f8c4/b8a6c84311f74234.png)

现在，就可以通过 `你的 Github 用户名.github.io` 访问网盘了。

