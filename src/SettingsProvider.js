import React, {createContext, useEffect, useState} from 'react';
import {getSettings} from 'services/sessionStorage';
import Preloader from 'components/root/Preloader';
import {useTranslation} from 'react-i18next';

const SettingsContext = createContext();

const SettingsProvider = ({children}) => {
  const [settings, setSettings] = useState({theme: 'light', language: 'en'});
  const [initializing, setInitializing] = useState(true);
  const {i18n} = useTranslation();

  useEffect(() => {
    getSettings()
      .then(value => {
        value && setSettings(value);
        value?.language && i18n.changeLanguage(value.language);
      })
      .finally(() => setInitializing(false));
  }, [i18n]);

  return initializing ? (
    <Preloader loading />
  ) : (
    <SettingsContext.Provider value={{settings, setSettings}}>
      {children}
    </SettingsContext.Provider>
  );
};

export {SettingsContext, SettingsProvider};
