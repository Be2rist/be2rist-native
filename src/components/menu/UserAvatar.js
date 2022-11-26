import {Avatar} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import React from 'react';
import PropTypes from 'prop-types';

const UserAvatar = ({user, isDarkMode}) =>
  user ? (
    <Avatar.Image source={{uri: user.photoURL}} size={32} />
  ) : (
    <Avatar.Icon
      size={32}
      icon="account"
      style={{
        backgroundColor: isDarkMode ? Colors.dark : Colors.white,
      }}
    />
  );

export default UserAvatar;

UserAvatar.propTypes = {
  user: PropTypes.object,
  isDarkMode: PropTypes.bool.isRequired,
};
