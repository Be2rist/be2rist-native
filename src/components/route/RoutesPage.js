import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useDispatch, useSelector} from 'react-redux';
import {getRoutes, selectRouteList} from 'services/redux/routeSlice';
import RouteCard from 'components/route/RouteCard';
import {SettingsContext} from 'SettingsProvider';
import {useNavigate} from 'react-router-native';

const RoutesPage = () => {
  const [page] = useState({id: 0});
  const dispatch = useDispatch();
  const routes = useSelector(state => selectRouteList(state));
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getRoutes(page));
  }, [dispatch, page]);
  const {
    settings: {theme},
  } = useContext(SettingsContext);
  const isDarkMode = theme === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          {routes.map(route => (
            <RouteCard
              key={route.id}
              route={route}
              onPlay={() => navigate(`/play/${route.id}`)}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RoutesPage;
