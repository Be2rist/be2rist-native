import React, {useMemo} from 'react';
import {
  matchRoutes,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-native';
import routes from 'routes';
import {useTranslation} from 'react-i18next';
import {BottomNavigation} from 'react-native-paper';

const Route = () => <Outlet />;

const menuRoutes = routes.filter(route => route.mainMenu);

const routeOutlet = menuRoutes
  .map(item => item.key)
  .reduce((acc, curr) => {
    acc[curr] = Route;
    return acc;
  }, {});

const MainMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {t} = useTranslation();
  const navigationRoutes = useMemo(
    () =>
      menuRoutes.map(item => ({...item, title: t(`mainMenu.${item.title}`)})),
    [t],
  );

  const [{route}] = matchRoutes(routes, location);
  const redirect = next =>
    navigate(menuRoutes.find(item => item.index === next)?.path || '/');

  const renderScene = BottomNavigation.SceneMap(routeOutlet);
  return (
    <BottomNavigation
      navigationState={{index: route?.index || 0, routes: navigationRoutes}}
      onIndexChange={redirect}
      renderScene={renderScene}
    />
  );
};

export default MainMenu;
