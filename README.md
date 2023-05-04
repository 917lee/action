# manage-system #
基于Bootstrap 5 + Node.js + Mysql的考勤管理系统解决方案。

## 准备工作 ##

需在本地安装 Node.js

## 功能 ##
- [x] 多端自适应UI
- [x] 登录/注销
- [x] 个人中心
- [x] 修改用户信息
- [x] 修改密码
- [x] mysql



## 安装步骤 ##
    // 从此步开始：
    环境流程以下流程需统一:
    1.安装 vscode;
    2.安装 node, 安装完 node -v 查看版本号；
    3.安装 mysql 数据库 安装链接：https://zhuanlan.zhihu.com/p/37152572
      链接内容从点击 msi 文件安装开始看；
    4.安装 Navicat 数据库软件, 并连接 mysql 数据库
        4.1 CREATE DATABASE designlogin;  // 创建名为 designlogin 的数据库
        4.2 SHOW DATABASES;               // 查看已有的数据库
    5.将当前目录的 login.sql 的内容在 Navicat 的 designlogin 的控制台运行 // 创建对应的表


    项目启动：
	cd ACTION    // 进入项目目录
	npm install         // 安装项目依赖，等待安装完成之后

## 本地开发 ##

	// 开启前端服务器，浏览器访问 http://localhost:8083，在根目录下执行下面命令
	npm run dev    // 或直接点击 package.json 内  run:front

## 服务端开发 ##

	// 开启后端服务器    
	npm run start


