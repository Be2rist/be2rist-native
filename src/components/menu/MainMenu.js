import React, {useCallback, useContext, useMemo} from 'react';
import {
  matchRoutes,
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-native';
import routes from 'routes';
import {useTranslation} from 'react-i18next';
import {BottomNavigation} from 'react-native-paper';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import AppHeader from 'components/menu/AppHeader';
import {SettingsContext} from 'SettingsProvider';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Route = () => null;

const menuRoutes = routes.filter(route => route.mainMenu);

const routeOutlet = menuRoutes
  .map(item => item.key)
  .reduce((acc, curr) => {
    acc[curr] = Route;
    return acc;
  }, {});

const renderScene = BottomNavigation.SceneMap(routeOutlet);

const MainMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {t} = useTranslation();
  const navigationRoutes = useMemo(
    () =>
      menuRoutes.map(item => ({
        ...item,
        title: t(`mainMenu.${item.title}`),
      })),
    [t],
  );

  const redirect = useCallback(
    next => {
      navigate(menuRoutes.find(item => item.index === next)?.path || '/');
    },
    [navigate],
  );

  const [{route}] = matchRoutes(routes, location);

  const {
    settings: {theme},
  } = useContext(SettingsContext);
  const isDarkMode = theme === 'dark';

  const backgroundStyle = useMemo(
    () => ({
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
      flex: 1,
    }),
    [isDarkMode],
  );

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <AppHeader />
      <View style={backgroundStyle}>
        <Outlet />
      </View>
      <View style={styles.bottomNavigation}>
        <BottomNavigation
          navigationState={{
            index: route?.index || 0,
            routes: navigationRoutes,
          }}
          onIndexChange={redirect}
          renderScene={renderScene}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomNavigation: {
    flex: 0.13,
  },
});

export default React.memo(MainMenu);
