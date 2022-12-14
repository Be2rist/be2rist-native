import React from 'react';
import {AppRegistry} from 'react-native';
import App from 'App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import store from 'store';
import './i18n';
import functions from '@react-native-firebase/functions';
import {SettingsProvider} from 'SettingsProvider';

if (__DEV__) {
  functions().useEmulator('localhost', 5001);
}

const reduxStore = store();

const RNRedux = () => (
  <Provider store={reduxStore}>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
