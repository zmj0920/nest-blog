import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/articleList',
  title: '文章列表',
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
