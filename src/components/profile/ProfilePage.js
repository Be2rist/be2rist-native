import React, {useContext} from 'react';
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

const LogoutButton = (props, onSignOut) => (
  <IconButton {...props} icon="logout" onPress={onSignOut} />
);

const ProfileAvatar = (props, user) => (
  <Avatar.Image source={{uri: user.photoURL}} {...props} />
);

const SettingsIcon = props => <List.Icon {...props} icon="cog" />;

const ProfilePage = () => {
  const user = useSelector(state => selectUser(state));
  const navigate = useNavigate();
  const {t} = useTranslation();
  const {
    settings: {theme},
  } = useContext(SettingsContext);
  const isDarkMode = theme === 'dark';

  const onSignOut = () => auth().signOut();

  return (
    <BackgroundScrollView>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => navigate('/')} />
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
            left={props => ProfileAvatar(props, user)}
            right={props => LogoutButton(props, onSignOut)}
          />
        ) : (
          <Button onPress={() => navigate('/login')}>{t('login')}</Button>
        )}
      </View>
      <TouchableRipple
        onPress={() => navigate('/settings')}
        rippleColor="rgba(0, 0, 0, .32)">
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
