import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = (app) => ({
  path: '/article',
  title: 'CRUD示例',
  //  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
  component: dynamicWrapper(app, [], () => import('./components')),
  exact: true
});

export default (app) => createRoute(app, routesConfig);
