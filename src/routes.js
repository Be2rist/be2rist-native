import React, {lazy} from 'react';
import {
  getRouteById,
  getUserRoutes,
  initRoute,
} from 'services/redux/routeSlice';
import {
  getNearbyPoints,
  getPointById,
  getUserPoints,
  initPoint,
} from 'services/redux/pointSlice';

const LoginPage = lazy(() => import('components/login/LoginPage'));
const SharingPage = lazy(() => import('components/sharing/SharingPage'));
const GamesPage = lazy(() => import('components/game/GamesPage'));
const ProfilePage = lazy(() => import('components/profile/ProfilePage'));
const PointsPage = lazy(() => import('components/point/view/PointsPage'));
const PointEditPage = lazy(() => import('components/point/edit/PointEditPage'));
const RouteEditPage = lazy(() => import('components/route/edit/RouteEditPage'));
const PointViewPage = lazy(() => import('components/point/view/PointViewPage'));
const PlayRoutePage = lazy(() => import('components/route/PlayRoutePage'));
const RoutesPage = lazy(() => import('components/route/RoutesPage'));
const SettingsPage = lazy(() => import('components/settings/SettingsPage'));

const routes = [
  {
    path: '/login',
    element: <LoginPage />,
    unAuthenticated: true,
    fullScreen: true,
  },
  {
    path: '/routes',
    key: 'routes',
    element: <RoutesPage />,
    title: 'routes',
    focusedIcon: 'navigation-variant',
    unfocusedIcon: 'navigation-variant-outline',
    mainMenu: true,
    index: 0,
    unAuthenticated: true,
  },
  {
    path: '/points',
    key: 'points',
    element: <PointsPage />,
    title: 'points',
    focusedIcon: 'map-marker',
    unfocusedIcon: 'map-marker-outline',
    mainMenu: true,
    index: 1,
    unAuthenticated: true,
    actions: [params => getNearbyPoints(params)],
  },
  {
    path: '/games',
    key: 'games',
    element: <GamesPage />,
    title: 'games',
    focusedIcon: 'gamepad',
    unfocusedIcon: 'gamepad-outline',
    index: 2,
    unAuthenticated: true,
  },
  {
    path: '/sharing/points',
    key: 'sharing',
    element: <SharingPage />,
    title: 'sharing',
    focusedIcon: 'image-edit',
    unfocusedIcon: 'image-edit-outline',
    mainMenu: true,
    index: 2,
    actions: [() => getUserPoints()],
  },
  {
    path: '/sharing/routes',
    index: 2,
    element: <SharingPage />,
    actions: [() => getUserRoutes()],
  },
  {
    path: '/play/:id',
    element: <PlayRoutePage />,
    unAuthenticated: true,
    fullScreen: true,
    actions: [params => getRouteById({id: params.id})],
  },
  {
    path: '/settings',
    element: <SettingsPage />,
    unAuthenticated: true,
    fullScreen: true,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
    unAuthenticated: true,
    fullScreen: true,
  },
  {
    path: '/route',
    element: <RouteEditPage />,
    fullScreen: true,
    actions: [() => initRoute()],
  },
  {
    path: '/point',
    element: <PointEditPage />,
    fullScreen: true,
    actions: [() => initPoint()],
  },
  {
    path: '/point/:id',
    element: <PointEditPage />,
    fullScreen: true,
    actions: [params => getPointById({id: params.id})],
  },
  {
    path: '/point-view/:id',
    element: <PointViewPage />,
    fullScreen: true,
    actions: [params => getPointById({id: params.id})],
  },
];

export default routes;
