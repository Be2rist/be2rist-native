import React, {useCallback, useContext} from 'react';
import {View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {
  Avatar,
  Button,
  Card,
  List,
  IconButton,
  TouchableRipple,
  Appbar,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {selectUser} from 'services/redux/userSlice';
import auth from '@react-native-firebase/auth';
import {useNavigate} from 'react-router-native';
import {useTranslation} from 'react-i18next';
import {SettingsContext} from 'SettingsProvider';
import ChevronIcon from 'components/custom/ChevronIcon';
import BackgroundScrollView from 'components/custom/BackgroundScrollView';

const LogoutButton = onSignOut => props =>
  <IconButton {...props} icon="logout" onPress={onSignOut} />;

const ProfileAvatar = user => props =>
  <Avatar.Image source={{uri: user.photoURL}} {...props} />;

const SettingsIcon = props => <List.Icon {...props} icon="cog" />;

const ProfilePage = () => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const {t} = useTranslation();
  const {
    settings: {theme},
  } = useContext(SettingsContext);
  const isDarkMode = theme === 'dark';

  const onSignOut = useCallback(() => {
    auth().signOut();
  }, []);

  const goBack = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const goSettings = useCallback(() => {
    navigate('/settings');
  }, [navigate]);

  return (
    <BackgroundScrollView>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={t('profile.title')} />
      </Appbar.Header>
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        {user ? (
          <Card.Title
            title={user.displayName}
            subtitle={user.email}
            left={ProfileAvatar(user)}
            right={LogoutButton(onSignOut)}
          />
        ) : (
          <Button onPress={() => navigate('/login')}>{t('login')}</Button>
        )}
      </View>
      <TouchableRipple onPress={goSettings} rippleColor="rgba(0, 0, 0, .32)">
        <List.Item
          title={t('settings.title')}
          left={SettingsIcon}
          right={ChevronIcon}
        />
      </TouchableRipple>
    </BackgroundScrollView>
  );
};

export default ProfilePage;
