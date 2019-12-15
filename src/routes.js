import React from 'react';

const Shops = React.lazy(() => import('./views/Shops/Tables'));
const Users = React.lazy(() => import('./views/Products/Tables'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/shops', name: 'Shops', component: Shops },
  { path: '/products', exact: true,  name: 'Products', component: Users },
];

export default routes;
