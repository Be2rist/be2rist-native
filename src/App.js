import React, {Node, useContext, useEffect, useState} from 'react';
import AppRouter from 'components/root/AppRouter';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {userChanged} from 'services/redux/userSlice';
import Preloader from 'components/root/Preloader';
import {
  MD3LightTheme as DefaultTheme,
  MD3DarkTheme as DefaultDarkTheme,
  Provider as PaperProvider,
} from 'react-native-paper';
import {SettingsContext} from 'SettingsProvider';
import NotificationMessageProvider from 'components/root/NotificationMessageProvider';
import {GeoLocationProvider} from 'GeoLocationProvider';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const defaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#00ba00',
    background: 'lightgray',
  },
};

const defaultDarkTheme = {
  ...DefaultDarkTheme,
  colors: {
    ...DefaultDarkTheme.colors,
    primary: '#00ba00',
  },
};

const Main = () => {
  const dispatch = useDispatch();
  const [initializing, setInitializing] = useState(true);
  const {settings} = useContext(SettingsContext);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      dispatch(userChanged(user));
      setInitializing(false);
    });
    return () => unsubscribe();
  }, [dispatch]);

  return initializing ? (
    <Preloader loading />
  ) : (
    <SafeAreaProvider>
      <PaperProvider
        theme={settings.theme === 'dark' ? defaultDarkTheme : defaultTheme}>
        <GeoLocationProvider>
          <NotificationMessageProvider>
            <AppRouter />
          </NotificationMessageProvider>
        </GeoLocationProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
};

const App: () => Node = () => <Main />;

export default App;
