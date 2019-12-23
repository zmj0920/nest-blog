import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = (app) => ({
  path: '/article',
  title: '添加文章',
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
  exact: true
});

export default (app) => createRoute(app, routesConfig);
