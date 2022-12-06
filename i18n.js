import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import RNLanguageDetector from '@os-team/i18next-react-native-language-detector';
import * as en from './locales/en/translation.json';
import * as pl from './locales/pl/translation.json';
import * as ru from './locales/ru/translation.json';
import languages from 'languages';

i18n
  .use(RNLanguageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    fallbackLng: 'en',
    supportedLngs: languages.map(lng => lng.lng),
    resources: {
      en: {
        translation: en,
      },
      pl: {
        translation: pl,
      },
      ru: {
        translation: ru,
      },
    },
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
