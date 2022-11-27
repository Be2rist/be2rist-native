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

const defaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'tomato',
    secondary: 'yellow',
    background: 'lightgray',
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
    <PaperProvider
      theme={settings.theme === 'dark' ? DefaultDarkTheme : defaultTheme}>
      <GeoLocationProvider>
        <NotificationMessageProvider>
          <AppRouter />
        </NotificationMessageProvider>
      </GeoLocationProvider>
    </PaperProvider>
  );
};

const App: () => Node = () => <Main />;

export default App;
