---
title: Git常用命令
author: Tide
avatar: https://cdn.jsdelivr.net/gh/ShmilyXI/Gallerys@master/NoteImage/1055543572.jpeg
authorLink: 'http://www.shmilyxy.cn'
authorAbout: 潮生
authorDesc: 一个好奇的人
categories: 技术
date: 2020-04-02 22:16:01
comments: true
tags: 
 - web
 - 书单
keywords: Git 命令
description: Git常用命令
photos: https://cdn.jsdelivr.net/gh/ShmilyXI/Gallerys@master/NoteImage/AFYRfI.jpg
---
# Git常用命令

![](https://cdn.jsdelivr.net/gh/ShmilyXI/Gallerys@master/NoteImage/AFYRfI.jpg)

```js
1.设置git账户
git config --global user.name "Your Name"
git config --global user.email "[email@example.com]"

2.删除远程分支
git branch -ｒ // 查看远程分支
git branch -r -d origin/branch-name // 删除本地分支
git push origin :branch-name // 通知版本库删除远程分支
git push -d origin branch-name // 直接删除远程分支

3.暂存更改
git stash list // 显示保存进度的列表
git stash pop [–index] [stash_id]
git stash pop 恢复最新的进度到工作区。git默认会把工作区和暂存区的改动都恢复到工作区。
git stash pop --index 恢复最新的进度到工作区和暂存区。（尝试将原来暂存区的改动还恢复到暂存区）
git stash pop stash@{1}恢复指定的进度到工作区。stash_id是通过git stash list命令得到的
通过git stash pop命令恢复进度后，会删除当前进度。
git stash apply [–index] [stash_id] 除了不删除恢复的进度之外，其余和git stash pop 命令一样。
git stash drop [stash_id] 删除一个存储的进度。如果不指定stash_id，则默认删除最新的存储进度。
git stash clear 删除所有存储的进度。

3.仓库状态
git status

4.git历史记录
git log

5.常用命令
git remote show origin 显示远程库origin里的资源
git branch -D master develop 删除本地库develop
git config --list 看所有用户
git ls-files 看已经被提交的
git rm [file name] 删除一个文件
git diff 查看尚未暂存的更新
git rm a.a 移除文件(从暂存区和工作区中删除)
git rm --cached a.a 移除文件(只从暂存区中删除)
git commit -m "remove" 移除文件(从Git中删除)
git rm -f a.a 强行移除修改后文件(从暂存区和工作区中删除)
git diff --cached 或 git diff --staged 查看尚未提交的更新
git reset --soft HEAD{^|~1|~n} 撤回上次commit或者撤回几次
```

### 专用名词的译名
Workspace：工作区
Index / Stage：暂存区
Repository：仓库区（或本地仓库）
Remote：远程仓库
# 一、新建代码库

### 在当前目录新建一个Git代码库
```js
git init 
```

### 新建一个目录，将其初始化为Git代码库
```js
git init [project-name] 
```

### 下载一个项目和它的整个代码历史
```js
git clone [url] 
```
# 二、配置
Git的设置文件为.gitconfig，它可以在用户主目录下（全局配置），也可以在项目目录下（项目配置）。


### 显示当前的Git配置
```js
git config --list 
```

### 编辑Git配置文件
```js
git config -e [--global] 
```

### 设置提交代码时的用户信息
```js
git config [--global] user.name "[name]" 
```
```js
git config [--global] user.email "[email address]" 
```
# 三、增加/删除文件

### 添加指定文件到暂存区
```js
git add [file1] [file2] ... 
```

### 添加指定目录到暂存区，包括子目录
```js
git add [dir] 
```

### 添加当前目录的所有文件到暂存区
```js
git add . 
```

### 添加每个变化前，都会要求确认
### 对于同一个文件的多处变化，可以实现分次提交
```js
git add -p 
```

### 删除工作区文件，并且将这次删除放入暂存区
```js
git rm [file1] [file2] ... 
```

### 停止追踪指定文件，但该文件会保留在工作区
```js
git rm --cached [file] 
```

### 改名文件，并且将这个改名放入暂存区
```js
git mv [file-original] [file-renamed] 
```
# 四、代码提交

### 提交暂存区到仓库区
```js
git commit -m [message] 
```

### 提交暂存区的指定文件到仓库区
```js
git commit [file1] [file2] ... -m [message] 
```

### 提交工作区自上次commit之后的变化，直接到仓库区
```js
git commit -a 
```

### 提交时显示所有diff信息
```js
git commit -v 
```

### 使用一次新的commit，替代上一次提交
### 如果代码没有任何新变化，则用来改写上一次commit的提交信息
```js
git commit --amend -m [message] 
```

### 重做上一次commit，并包括指定文件的新变化
```js
git commit --amend [file1] [file2] ... 
```
# 五、分支

### 列出所有本地分支
```js
git branch 
```

### 列出所有远程分支
```js
git branch -r 
```

### 列出所有本地分支和远程分支
```js
git branch -a 
```

### 新建一个分支，但依然停留在当前分支
```js
git branch [branch-name] 
```

### 新建一个分支，并切换到该分支
```js
git checkout -b [branch] 
```

### 新建一个分支，指向指定commit
```js
git branch [branch] [commit] 
```

### 新建一个分支，与指定的远程分支建立追踪关系
```js
git branch --track [branch] [remote-branch] 
```

### 切换到指定分支，并更新工作区
```js
git checkout [branch-name] 
```

### 切换到上一个分支
```js
git checkout - 
```

### 建立追踪关系，在现有分支与指定的远程分支之间
```js
git branch --set-upstream [branch] [remote-branch] 
```

### 合并指定分支到当前分支
```js
git merge [branch] 
```

### 选择一个commit，合并进当前分支
```js
git cherry-pick [commit] 
```

### 删除分支
```js
git branch -d [branch-name] 
```

### 删除远程分支
```js
git push origin --delete [branch-name] 
```
```js
git branch -dr [remote/branch] 
```
# 六、标签

### 列出所有tag
```js
git tag 
```

### 新建一个tag在当前commit
```js
git tag [tag] 
```

### 新建一个tag在指定commit
```js
git tag [tag] [commit] 
```

### 删除本地tag
```js
git tag -d [tag] 
```

### 删除远程tag
```js
git push origin :refs/tags/[tagName] 
```

### 查看tag信息
```js
git show [tag] 
```

### 提交指定tag
```js
git push [remote] [tag] 
```

### 提交所有tag
```js
git push [remote] --tags 
```

### 新建一个分支，指向某个tag
```js
git checkout -b [branch] [tag] 
```
# 七、查看信息

### 显示有变更的文件
```js
git status 
```

### 显示当前分支的版本历史
```js
git log 
```

### 显示commit历史，以及每次commit发生变更的文件
```js
git log --stat 
```

### 搜索提交历史，根据关键词
```js
git log -S [keyword] 
```

### 显示某个commit之后的所有变动，每个commit占据一行
```js
git log [tag] HEAD --pretty=format:%s 
```

### 显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件
```js
git log [tag] HEAD --grep feature 
```

### 显示某个文件的版本历史，包括文件改名
```js
git log --follow [file] 
```
```js
git whatchanged [file] 
```

### 显示指定文件相关的每一次diff
```js
git log -p [file] 
```

### 显示过去5次提交
```js
git log -5 --pretty --oneline 
```

### 显示所有提交过的用户，按提交次数排序
```js
git shortlog -sn 
```

### 显示指定文件是什么人在什么时间修改过
```js
git blame [file] 
```

### 显示暂存区和工作区的差异
```js
git diff 
```

### 显示暂存区和上一个commit的差异
```js
git diff --cached [file] 
```

### 显示工作区与当前分支最新commit之间的差异
```js
git diff HEAD 
```

### 显示两次提交之间的差异
```js
git diff [first-branch]...[second-branch] 
```

### 显示今天你写了多少行代码
```js
git diff --shortstat "@{0 day ago}" 
```

### 显示某次提交的元数据和内容变化
```js
git show [commit] 
```

### 显示某次提交发生变化的文件
```js
git show --name-only [commit] 
```

### 显示某次提交时，某个文件的内容
```js
git show [commit]:[filename] 
```

### 显示当前分支的最近几次提交
```js
git reflog 
```
# 八、远程同步

### 下载远程仓库的所有变动
```js
git fetch [remote] 
```

### 显示所有远程仓库
```js
git remote -v 
```

### 显示某个远程仓库的信息
```js
git remote show [remote] 
```

### 增加一个新的远程仓库，并命名
```js
git remote add [shortname] [url] 
```

### 取回远程仓库的变化，并与本地分支合并
```js
git pull [remote] [branch] 
```

### 上传本地指定分支到远程仓库
```js
git push [remote] [branch] 
```

### 强行推送当前分支到远程仓库，即使有冲突
```js
git push [remote] --force 
```

### 推送所有分支到远程仓库
```js
git push [remote] --all 
```
# 九、撤销

### 恢复暂存区的指定文件到工作区
```js
git checkout [file] 
```

### 恢复某个commit的指定文件到暂存区和工作区
```js
git checkout [commit] [file] 
```

### 恢复暂存区的所有文件到工作区
```js
git checkout . 
```

### 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变
```js
git reset [file] 
```

### 重置暂存区与工作区，与上一次commit保持一致
```js
git reset --hard 
```

### 重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变
```js
git reset [commit] 
```

### 重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致
```js
git reset --hard [commit] 
```

### 重置当前HEAD为指定commit，但保持暂存区和工作区不变
```js
git reset --keep [commit] 
```

### 新建一个commit，用来撤销指定commit
### 后者的所有变化都将被前者抵消，并且应用到当前分支
```js
git revert [commit] 
```

### 暂时将未提交的变化移除，稍后再移入
```js
git stash 
```
```js
git stash pop 
```
# 十、其他

### 生成一个可供发布的压缩包
```js
git archive 
```