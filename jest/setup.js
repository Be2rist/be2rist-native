/* eslint-disable no-undef */
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

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
      location: '/points',
    }),
  };
});

jest.mock('react-i18next', () => {
  const Actual18 = jest.requireActual('react-i18next');
  return {
    ...Actual18,
    useTranslation: () => {
      return {
        t: str => str,
        i18n: {
          changeLanguage: () => new Promise(() => {}),
        },
      };
    },
    languageDetector: {
      detect: () => ({}),
    },
  };
});

jest.mock('configs', () => ({
  config: {
    GOOGLE_MAP_API_KEY: 'TEST_API_KEY',
    CLIENT_ID: 'CLIENT_ID',
  },
}));
