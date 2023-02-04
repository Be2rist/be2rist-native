/* eslint-disable no-undef */
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('@robinbobin/react-native-google-drive-api-wrapper', () => {});

jest.mock('@react-native-google-signin/google-signin', () => {});

const theme = {
  dark: false,
  roundness: 4,
  version: 3,
  isV3: true,
  colors: {
    primary: 'rgba(103, 80, 164, 1)',
    primaryContainer: 'rgba(234, 221, 255, 1)',
    secondary: 'rgba(98, 91, 113, 1)',
    secondaryContainer: 'rgba(232, 222, 248, 1)',
    tertiary: 'rgba(125, 82, 96, 1)',
    tertiaryContainer: 'rgba(255, 216, 228, 1)',
    surface: 'rgba(255, 251, 254, 1)',
    surfaceVariant: 'rgba(231, 224, 236, 1)',
    surfaceDisabled: 'rgba(28, 27, 31, 0.12)',
    background: 'rgba(255, 251, 254, 1)',
    error: 'rgba(179, 38, 30, 1)',
    errorContainer: 'rgba(249, 222, 220, 1)',
    onPrimary: 'rgba(255, 255, 255, 1)',
    onPrimaryContainer: 'rgba(33, 0, 93, 1)',
    onSecondary: 'rgba(255, 255, 255, 1)',
    onSecondaryContainer: 'rgba(29, 25, 43, 1)',
    onTertiary: 'rgba(255, 255, 255, 1)',
    onTertiaryContainer: 'rgba(49, 17, 29, 1)',
    onSurface: 'rgba(28, 27, 31, 1)',
    onSurfaceVariant: 'rgba(73, 69, 79, 1)',
    onSurfaceDisabled: 'rgba(28, 27, 31, 0.38)',
    onError: 'rgba(255, 255, 255, 1)',
    onErrorContainer: 'rgba(65, 14, 11, 1)',
    onBackground: 'rgba(28, 27, 31, 1)',
    outline: 'rgba(121, 116, 126, 1)',
    outlineVariant: 'rgba(202, 196, 208, 1)',
    inverseSurface: 'rgba(49, 48, 51, 1)',
    inverseOnSurface: 'rgba(244, 239, 244, 1)',
    inversePrimary: 'rgba(208, 188, 255, 1)',
    shadow: 'rgba(0, 0, 0, 1)',
    scrim: 'rgba(0, 0, 0, 1)',
    backdrop: 'rgba(50, 47, 55, 0.4)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(247, 243, 249)',
      level2: 'rgb(243, 237, 246)',
      level3: 'rgb(238, 232, 244)',
      level4: 'rgb(236, 230, 243)',
      level5: 'rgb(233, 227, 241)',
    },
  },
  fonts: {
    displayLarge: {
      fontFamily: 'System',
      letterSpacing: 0,
      fontWeight: '400',
      lineHeight: 64,
      fontSize: 57,
    },
    displayMedium: {
      fontFamily: 'System',
      letterSpacing: 0,
      fontWeight: '400',
      lineHeight: 52,
      fontSize: 45,
    },
    displaySmall: {
      fontFamily: 'System',
      letterSpacing: 0,
      fontWeight: '400',
      lineHeight: 44,
      fontSize: 36,
    },
    headlineLarge: {
      fontFamily: 'System',
      letterSpacing: 0,
      fontWeight: '400',
      lineHeight: 40,
      fontSize: 32,
    },
    headlineMedium: {
      fontFamily: 'System',
      letterSpacing: 0,
      fontWeight: '400',
      lineHeight: 36,
      fontSize: 28,
    },
    headlineSmall: {
      fontFamily: 'System',
      letterSpacing: 0,
      fontWeight: '400',
      lineHeight: 32,
      fontSize: 24,
    },
    titleLarge: {
      fontFamily: 'System',
      letterSpacing: 0,
      fontWeight: '400',
      lineHeight: 28,
      fontSize: 22,
    },
    titleMedium: {
      fontFamily: 'System',
      letterSpacing: 0.15,
      fontWeight: '500',
      lineHeight: 24,
      fontSize: 16,
    },
    titleSmall: {
      fontFamily: 'System',
      letterSpacing: 0.1,
      fontWeight: '500',
      lineHeight: 20,
      fontSize: 14,
    },
    labelLarge: {
      fontFamily: 'System',
      letterSpacing: 0.1,
      fontWeight: '500',
      lineHeight: 20,
      fontSize: 14,
    },
    labelMedium: {
      fontFamily: 'System',
      letterSpacing: 0.5,
      fontWeight: '500',
      lineHeight: 16,
      fontSize: 12,
    },
    labelSmall: {
      fontFamily: 'System',
      letterSpacing: 0.5,
      fontWeight: '500',
      lineHeight: 16,
      fontSize: 11,
    },
    bodyLarge: {
      fontFamily: 'System',
      letterSpacing: 0.15,
      fontWeight: '400',
      lineHeight: 24,
      fontSize: 16,
    },
    bodyMedium: {
      fontFamily: 'System',
      letterSpacing: 0.25,
      fontWeight: '400',
      lineHeight: 20,
      fontSize: 14,
    },
    bodySmall: {
      fontFamily: 'System',
      letterSpacing: 0.4,
      fontWeight: '400',
      lineHeight: 16,
      fontSize: 12,
    },
    default: {
      fontFamily: 'System',
      letterSpacing: 0,
      fontWeight: '400',
    },
  },
  animation: {
    scale: 1,
  },
};

jest.mock('react', () => {
  const ActualReact = jest.requireActual('react');
  return {
    ...ActualReact,
    useContext: () => ({
      settings: {
        theme: 'light',
        language: 'en',
      },
      ...theme,
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
