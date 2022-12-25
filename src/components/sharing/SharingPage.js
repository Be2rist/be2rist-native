import React, {useCallback, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, FAB} from 'react-native-paper';
import {matchRoutes, useLocation, useNavigate} from 'react-router-native';
import BackgroundScrollView from 'components/custom/BackgroundScrollView';
import {useTranslation} from 'react-i18next';
import routes from 'routes';
import SharingPoints from 'components/sharing/SharingPoints';
import SharingRoutes from 'components/sharing/SharingRoutes';

const routeElements = {
  ROUTES: 'ROUTES',
  POINTS: 'POINTS',
};

const selectedElementMap = {
  '/sharing/routes': routeElements.ROUTES,
  '/sharing/points': routeElements.POINTS,
};

const sharingPageResolver = {
  [routeElements.ROUTES]: <SharingRoutes />,
  [routeElements.POINTS]: <SharingPoints />,
};

const createElementLinks = {
  [routeElements.ROUTES]: '/route',
  [routeElements.POINTS]: '/point',
};

const SharingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {t} = useTranslation();
  const [{route}] = matchRoutes(routes, location);

  const selectedElement = useMemo(
    () => selectedElementMap[route.path],
    [route.path],
  );

  const createElement = useCallback(() => {
    navigate(createElementLinks[selectedElement]);
  }, [navigate, selectedElement]);

  const navigateRoutes = useCallback(() => {
    navigate('/sharing/routes');
  }, [navigate]);

  const navigatePoints = useCallback(() => {
    navigate('/sharing/points');
  }, [navigate]);

  return (
    <View style={styles.page}>
      <BackgroundScrollView>
        <View style={styles.elementContainer}>
          <Button
            style={styles.elementButton}
            icon="navigation-variant"
            mode={
              selectedElement === routeElements.ROUTES
                ? 'contained'
                : 'elevated'
            }
            onPress={navigateRoutes}>
            {t('mainMenu.routes')}
          </Button>
          <Button
            style={styles.elementButton}
            icon="map-marker"
            mode={
              selectedElement === routeElements.POINTS
                ? 'contained'
                : 'elevated'
            }
            onPress={navigatePoints}>
            {t('mainMenu.points')}
          </Button>
        </View>
        <View style={styles.content}>
          {sharingPageResolver[selectedElement]}
        </View>
      </BackgroundScrollView>
      <FAB icon="plus" style={styles.fab} onPress={createElement} />
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  elementContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  elementButton: {
    margin: 5,
    flexBasis: '46%',
  },
  content: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    borderRadius: 50,
    bottom: 0,
  },
});

export default SharingPage;
