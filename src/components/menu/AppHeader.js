import React, {useContext} from 'react';
import {Appbar, TouchableRipple} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {selectUser} from 'services/redux/userSlice';
import {Image, StyleSheet} from 'react-native';
import {useNavigate} from 'react-router-native';
import {SettingsContext} from 'SettingsProvider';
import UserAvatar from 'components/menu/UserAvatar';
import {GeoLocationContext} from 'GeoLocationProvider';
import {LOGO} from 'images';

const AppHeader = () => {
  const user = useSelector(state => selectUser(state));
  const navigate = useNavigate();
  const {
    settings: {theme},
  } = useContext(SettingsContext);
  const isDarkMode = theme === 'dark';
  const {enabled: gpsEnabled} = useContext(GeoLocationContext);

  return (
    <Appbar.Header style={styles.header}>
      <Image source={LOGO} style={styles.logoImage} />
      <Appbar.Content title="B2rist" style={styles.title} />
      {!gpsEnabled && <Appbar.Action icon="map-marker-off" color="red" />}
      <TouchableRipple
        onPress={() => navigate('/profile')}
        rippleColor="rgba(0, 0, 0, .32)"
        borderless
        style={styles.avatarRipple}>
        <UserAvatar user={user} isDarkMode={isDarkMode} />
      </TouchableRipple>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 50,
  },
  logoImage: {
    width: 44,
    height: 30,
  },
  title: {
    marginLeft: 10,
  },
  avatarRipple: {
    borderRadius: 50,
    marginRight: 7,
  },
});

export default AppHeader;
