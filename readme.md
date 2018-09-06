blog3: Rainboy写的给Rainboy使用的blog系统

相对于blog2,blog3设计的更加简单

特点:

 - 使用mongodb作为数据库
 - git web_push_hack 自动更新数据库
 - 更加的简单的书写原则
流程:

 - 每篇文章都有相应的**信息头**
   - 没有**信息头**的文章不会存入数据库
 - webhack 发出后,自动git pull
 - 遍历每个文章(略过`.`开头的文章与文件夹)
 - 读取每一个文章,然后存入数据库

yaml信息头

 - 标题:
 - 系列文章: 唯一
 - 分类文章: 可以多个
 - 密码: 可选,如果没有或者为null就是需要密码
 - 标签: 多个,可选
 - 作者: 可选
 - 写作时间: 可选,如果没有就是添加到数据库的时间

```sh
---
_id:    # 唯一标识
title:  # 标题
category:
 - 目录1
 - 目录2
tags:
 - 标签1
 - 标签2
date:       # 写作时间
update:     # 更新时间
series:     # 系列文章,默认 无系列
password:   密码 #需要密码都访问 这个还没有完成 todo
hidden: false # 是否删除/隐藏
---
```


## 配置:


配置读取的位置优先级:

 1. `/etc/rblog/config.yaml`
 2. `~/.config/rblog/config.yaml`

 - git 仓库地址
 - token
 - 通用密码


```
article_git_rep: https://your_article_rep # git 仓库地址
local_rep: ~/local_git #从远程仓库拉取后,本地存储地址
log_path: ~/local_path #log保存的地址,主要是记录parse的log
parse_hidden: false #是否解析以`.`开始的文字
not_parse_dir_reg: #不会解析的正则表达式的 文件夹名
 - _draft$
not_parse_reg_file: #不会解析的正则表达式的 文件名
 - _draft$
DB:                 # 数据库相关
  addr: 127.0.0.1/blog
  opts: {}
```

## 单独手动执行解析

```sh
node server/parse_artilce/parse.js solo
```

删除数据库,重新更新所有的文章
```sh
node server/parse_artilce/parse.js solo drop
```
