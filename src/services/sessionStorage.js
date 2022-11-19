import AsyncStorage from '@react-native-async-storage/async-storage';

const SETTINGS_KEY = 'settings';

export const storeSettings = value =>
  AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(value));

export const getSettings = () =>
  new Promise(resolve =>
    AsyncStorage.getItem(SETTINGS_KEY).then(value =>
      resolve(JSON.parse(value)),
    ),
  );
