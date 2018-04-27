# guzhi

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 项目说明
# 该工程是最简单且基于Air进行配置的前端工程.包括基本的登录、token保存及一个基于HUI的简单demo
# 使用技术: Vue/Vue-router(前端路由管理)/axios(向服务端发送请求)/HUI

## 文件说明
#build --- 前端工程webpack构建设置
#config --- 前端工程构建参数设置(通过index.js配置项目开发运行端口等及打包相关配置)
#src --- 项目源码
#    -api --- 服务端接口请求配置
#    -assets --- 项目静态文件,图片等
#    -components ---项目自定义组件
#    -mock ---mock模拟数据（真实交互环境可以不需要）
#    -router --- 项目路由配置
#    -style --- 项目样式文件
#    -utils --- 项目公共方法文件
#    -directives --- 项目自定义指令文件
#    -mixins --- 项目混入文件
#    -views --- 项目中各功能页
#    -app.vue --- 项目入口渲染页面
#    -main.js --- 项目入口文件(创建整个项目的vue实例，并将router、hui等注入)
#index.html --- 项目入口模板
#package.json --- 项目的依赖配置、运行配置等
#sysconfig.js --- 项目常用接口配置
#其余暂不用关注

## 命令
# 安装插件包 --- cnpm instll (推荐) 或者 npm instll
# 打包 --- npm run build 
# 运行 --- npm run dev
