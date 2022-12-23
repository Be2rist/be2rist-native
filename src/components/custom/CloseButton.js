import React, {useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import {useNavigate} from 'react-router-native';
import PropTypes from 'prop-types';

const CloseButton = ({path}) => {
  const navigate = useNavigate();

  const close = useCallback(() => {
    navigate(path);
  }, [navigate, path]);

  return (
    <View style={styles.closeButton}>
      <IconButton icon="close" size={50} onPress={close} />
    </View>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    left: 1,
    top: 1,
    zIndex: 10001,
  },
});

export default CloseButton;

CloseButton.propTypes = {
  path: PropTypes.string,
};

CloseButton.defaultProps = {
  path: '/',
};
