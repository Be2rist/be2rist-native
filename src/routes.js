import React, {lazy} from 'react';
import {getRouteById} from 'services/redux/routeSlice';

const LoginPage = lazy(() => import('components/login/LoginPage'));
const SharingPage = lazy(() => import('components/sharing/SharingPage'));
const ProfilePage = lazy(() => import('components/profile/ProfilePage'));
const FavoritePage = lazy(() => import('components/favorites/FavoritePage'));
const PlayRoutePage = lazy(() => import('components/route/PlayRoutePage'));
const RoutePage = lazy(() => import('components/route/RoutePage'));
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
    element: <RoutePage />,
    title: 'routes',
    focusedIcon: 'navigation-variant',
    unfocusedIcon: 'navigation-variant-outline',
    mainMenu: true,
    index: 0,
    unAuthenticated: true,
  },
  {
    path: '/favorites',
    key: 'favorites',
    element: <FavoritePage />,
    title: 'favorites',
    focusedIcon: 'heart',
    unfocusedIcon: 'heart-outline',
    mainMenu: true,
    index: 1,
  },
  {
    path: '/sharing',
    key: 'sharing',
    element: <SharingPage />,
    title: 'sharing',
    focusedIcon: 'image-edit',
    unfocusedIcon: 'image-edit-outline',
    mainMenu: true,
    index: 2,
  },
  {
    path: '/profile',
    key: 'profile',
    element: <ProfilePage />,
    title: 'profile',
    focusedIcon: 'account-circle',
    unfocusedIcon: 'account-circle-outline',
    mainMenu: true,
    index: 3,
    unAuthenticated: true,
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
];

export default routes;
