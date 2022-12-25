/* eslint-disable no-undef */
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('@robinbobin/react-native-google-drive-api-wrapper', () => {});

jest.mock('@react-native-google-signin/google-signin', () => {});

jest.mock('react', () => {
  const ActualReact = jest.requireActual('react');
  return {
    ...ActualReact,
    useContext: () => ({
      settings: {
        theme: 'light',
        language: 'en',
      },
      colors: {
        text: 'rgba(73, 69, 79, 1)',
      },
    }),
  };
});

jest.mock('react-i18next', () => ({
  useTranslation: () => {
    return {
      t: str => str,
      i18n: {
        changeLanguage: () => new Promise(() => {}),
      },
    };
  },
}));

jest.useFakeTimers();
global.clearImmediate = jest.fn();
global.setImmediate = jest.fn();
