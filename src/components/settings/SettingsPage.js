import React, {useCallback, useContext} from 'react';
import {useNavigate} from 'react-router-native';
import {useTranslation} from 'react-i18next';
import {Appbar, List, Switch, TouchableRipple} from 'react-native-paper';
import {SettingsContext} from 'SettingsProvider';
import LanguageListDialog from 'components/settings/LanguageListDialog';
import {storeSettings} from 'services/sessionStorage';
import ChevronIcon from 'components/custom/ChevronIcon';
import BackgroundScrollView from 'components/custom/BackgroundScrollView';

const ThemeLightIcon = props => (
  <List.Icon {...props} size={32} icon="theme-light-dark" />
);

const ThemeSwitch =
  ({settings, handleThemeChange}) =>
  props =>
    (
      <Switch
        {...props}
        value={settings.theme === 'dark'}
        onValueChange={handleThemeChange}
      />
    );

const LanguageIcon = props => <List.Icon {...props} icon="format-clear" />;

const SettingsPage = () => {
  const navigate = useNavigate();
  const {t, i18n} = useTranslation();
  const {settings, setSettings} = useContext(SettingsContext);
  const [languageDialogVisible, setLanguageDialogVisible] =
    React.useState(false);
  const showLanguageDialog = () => setLanguageDialogVisible(true);
  const hideLanguageDialog = () => setLanguageDialogVisible(false);

  const handleThemeChange = async () => {
    const newSettings = {
      ...settings,
      theme: settings.theme === 'light' ? 'dark' : 'light',
    };
    await storeSettings(newSettings);
    setSettings(newSettings);
  };

  const changeLanguage = async lng => {
    const newSettings = {
      ...settings,
      language: lng,
    };
    await storeSettings(newSettings);
    await i18n.changeLanguage(lng);
    setSettings(newSettings);
    hideLanguageDialog();
  };

  const Dialog = (
    <LanguageListDialog
      hideDialog={hideLanguageDialog}
      visible={languageDialogVisible}
      changeLanguage={changeLanguage}
    />
  );

  const goBack = useCallback(() => {
    navigate('/profile');
  }, [navigate]);

  return (
    <BackgroundScrollView dialog={Dialog}>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={t('settings.title')} />
      </Appbar.Header>
      <List.Item
        title={t('settings.darkMode')}
        left={ThemeLightIcon}
        right={ThemeSwitch({settings, handleThemeChange})}
      />
      <TouchableRipple
        onPress={showLanguageDialog}
        rippleColor="rgba(0, 0, 0, .32)">
        <List.Item
          title={t('settings.language')}
          left={LanguageIcon}
          right={ChevronIcon}
        />
      </TouchableRipple>
    </BackgroundScrollView>
  );
};

export default SettingsPage;
