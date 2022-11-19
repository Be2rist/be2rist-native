import React, {Suspense} from 'react';
import {Navigate, NativeRouter, useRoutes} from 'react-router-native';
import routes from 'routes';
import Preloader from 'components/root/Preloader';
import ProtectedActionRoute from 'components/root/ProtectedActionRoute';
import MainMenu from 'components/menu/MainMenu';

const convertRoutes = routeList =>
  routeList.map(route => ({
    path: route.path,
    element: (
      <Suspense fallback={<Preloader loading />}>
        {route.path ? <ProtectedActionRoute route={route} /> : route.element}
      </Suspense>
    ),
    ...(route.children ? {children: convertRoutes(route.children)} : {}),
  }));

const convertedRoutes = [
  ...convertRoutes(routes.filter(route => route.fullScreen)),
  {
    path: '/',
    element: <Navigate to="/routes" replace />,
  },
  {
    element: <MainMenu />,
    children: [...convertRoutes(routes.filter(route => !route.fullScreen))],
  },
];

const AppRoutes = () => useRoutes(convertedRoutes);

const AppRouter = () => (
  <NativeRouter>
    <AppRoutes />
  </NativeRouter>
);

export default AppRouter;
