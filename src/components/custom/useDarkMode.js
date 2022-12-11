import {useContext, useMemo} from 'react';
import {SettingsContext} from 'SettingsProvider';

const useDarkMode = () => {
  const {
    settings: {theme},
  } = useContext(SettingsContext);
  return useMemo(() => theme === 'dark', [theme]);
};

export default useDarkMode;
