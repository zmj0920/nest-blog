import { createRoutes } from '@/utils/core';
import BasicLayout from '@/layouts/BasicLayout';
import UserLayout from '@/layouts/UserLayout';
import Page403 from './Pages/403';
import NotFound from './Pages/404';
import Page500 from './Pages/500';
import Login from './Login';
import Register from './Register';
import Dashboard from './Dashboard';
import Blank from './Blank';
import CRUD from './Business/CRUD';
import CRUDDetail from './Business/CRUD/routers/Detail';
import ScreenLock from './Widgets/ScreenLock';
import Coming from './Widgets/Coming';
import Gallery from './Widgets/Gallery';
import Result from './Widgets/Result';
import LevelRoute from './Widgets/LevelRoute';
import EC from './Widgets/Charts/EC';
import G2 from './Widgets/Charts/G2';
import Editor from './Widgets/Editor';
import Toolbar from './Widgets/Toolbar';
import SearchBar from './Widgets/SearchBar';
import BaseComponent from './Widgets/BaseComponent';
import TransferTree from './Widgets/TransferTree';
import Print from './Widgets/Print';
import Button from './Widgets/Button';
import CSSAnimate from './Widgets/CSSAnimate';
import Icon from './Widgets/Icon';
import Form from './Widgets/Form';
import Article from './Article';


//import DataTable from './Widgets/DataTable';
/**
 * 主路由配置
 * 
 * path 路由地址
 * component 组件
 * indexRoute 默认显示路由
 * childRoutes 所有子路由
 * NotFound 路由要放到最下面，当所有路由当没匹配到时会进入这个页面
 */
const routesConfig = app => [
  {
    path: '/sign',
    title: '登录',
    indexRoute: '/sign/login',
    component: UserLayout,
    childRoutes: [
      Login(app),
      Register(app),
      NotFound()
    ]
  },
  {
    path: '/',
    title: '系统中心',
    component: BasicLayout,
    indexRoute: '/dashboard',
    childRoutes: [
      //仪表盘
      Dashboard(app),
      Form(app),
      //空白页
      Blank(app),
      Button(),
      Print(),
      Article(app),
      TransferTree(app),
      //ECharts
      EC(app),
      //G2
      G2(app),
      //富文本
      Editor(),
      //组件父类
      BaseComponent(),
      //CRUD示例
      CRUD(app),
      //CRUD详情
      CRUDDetail(app),
      //精彩即将呈现
      Coming(),
      //锁屏
      ScreenLock(),
      //画廊
      Gallery(),
      //结果页
      Result(),
      //
      Page403(),
      Page500(),
      //一级路由
      LevelRoute(app),
      //工具条
      Toolbar(app),
      //搜索条
      SearchBar(),
     // Alerts(),
      CSSAnimate(),
      Icon(),
      NotFound()
    ]
  }
];

export default app => createRoutes(app, routesConfig);
