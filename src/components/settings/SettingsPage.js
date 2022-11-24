import React, {useContext} from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useNavigate} from 'react-router-native';
import {useTranslation} from 'react-i18next';
import {Appbar, List, Switch, TouchableRipple} from 'react-native-paper';
import {SettingsContext} from 'SettingsProvider';
import LanguageListDialog from 'components/settings/LanguageListDialog';
import {storeSettings} from 'services/sessionStorage';
import ChevronIcon from 'components/custom/ChevronIcon';

const ThemeLightIcon = props => (
  <List.Icon {...props} size={32} icon="theme-light-dark" />
);

const ThemeSwitch = ({props, settings, handleThemeChange}) => (
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
  const isDarkMode = settings.theme === 'dark';
  const [languageDialogVisible, setLanguageDialogVisible] =
    React.useState(false);
  const showLanguageDialog = () => setLanguageDialogVisible(true);
  const hideLanguageDialog = () => setLanguageDialogVisible(false);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

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

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Appbar.Header>
          <Appbar.BackAction onPress={() => navigate('/profile')} />
          <Appbar.Content title={t('settings.title')} />
        </Appbar.Header>
        <List.Item
          title={t('settings.darkMode')}
          left={ThemeLightIcon}
          right={props => ThemeSwitch({props, settings, handleThemeChange})}
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
      </ScrollView>
      <LanguageListDialog
        hideDialog={hideLanguageDialog}
        visible={languageDialogVisible}
        changeLanguage={changeLanguage}
      />
    </SafeAreaView>
  );
};

export default SettingsPage;
