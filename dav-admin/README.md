# antd-dev-admin

使用开源框架地址 https://github.com/LANIF-UI/dva-boot-admin


简单的后台接口对接crud 和登录 

后台接口地址   https://github.com/zmj0920/koaproject








## 工程结构

```
├── public                   # 不参与编译的资源文件
├── src                      # 主程序目录
│   ├── index.js             # 程序启动和渲染入口文件
│   ├── config.js            # 全局配置
│   ├── menu.js              # 左侧菜单配置
│   ├── components           # 全局公共组件
│   ├── layouts              # 页面结构组件
│   │   ├── BasicLayout      # 基本布局
│   │   └── OtherLayout      # 布局组件根据具体功能调整，在路由配置中引用
│   ├── routes               # 动态路由目录（每个功能一个文件夹的MVC结构）
│   │   ├── index.js         # 路由配置文件
│   │   ├── Home             # 功能模块
│   │   │   ├── index.js     # 路由配置文件
│   │   │   ├── assets       # 单独属于这个模块的静态资源文件
│   │   │   ├── components   # 页面组件
│   │   │   ├── model        # dva model
│   │   │   ├── service      # dva service
│   │   │   └── routes **    # 子路由(目录结构与父级相同)
│   │   └── Login            # 功能模块
│   │       ├── index.js     # 路由配置文件
│   │       ├── assets       # 单独属于这个模块的静态资源文件
│   │       ├── components   # 页面组件
│   │       ├── model        # dva model
│   │       ├── service      # dva service
│   │       └── routes **    # 子路由(目录结构与父级相同)
│   ├── utils                # 工具类
│   └── assets               # 资源文件
│           ├── fonts        # 字体 & 字体图标
│           ├── images       # 图片
│           └── styles       # 全局样式
```


# 截图

![](./doc/img/1.png)
![](https://ucarecdn.com/4de73808-81bf-4fe9-a6a7-fb21000f0e56/banner.gif)
![](https://ucarecdn.com/f1f5cb8f-5209-4b91-beaf-e9c0e3e3737f/111.gif)
![](https://ucarecdn.com/fcfdbd3f-3d43-4a1e-a090-10038f92e1a6/13.jpg)
![](https://ucarecdn.com/6f9862ab-d9e6-4bda-9c6f-9b6a608ccc2a/12.jpg)
![](https://ucarecdn.com/fd93aad7-7963-4cbb-9ffd-4a09c44ee0a0/11.jpg)
![](https://ucarecdn.com/5440ec1c-f524-46ab-826b-742f20476ddf/15.jpg)
![](https://ucarecdn.com/2f35d9c3-d5e8-4519-bfbc-a0ee310e6817/2.jpg)
![](https://ucarecdn.com/eaef12d9-c878-4311-a539-cf53fd461280/3.jpg)
![](https://ucarecdn.com/e44e4383-d49c-46a6-a708-dbc5078d33f4/4.jpg)
![](https://ucarecdn.com/bef74a5c-fc05-4dcb-8512-7429971110c1/6.jpg)
![](https://ucarecdn.com/55cdf8da-37e0-4f19-b24f-00f00eddf5e1/5.jpg)
![](https://ucarecdn.com/890cae0d-dcde-48b4-9434-19e5fee2c883/9.jpg)
![](https://ucarecdn.com/54014eec-406b-437f-9356-f466a1a868ab/7.jpg)
![](https://ucarecdn.com/4e8c9b75-11df-4108-8437-bdb2627e3ebc/8.jpg)
![](https://ucarecdn.com/7831ce59-f412-4109-a75c-2b9f86b78c43/10.jpg)
![](https://ucarecdn.com/4cbe9623-30ef-4410-9740-9e03c2f4a84e/mobile1.gif)
