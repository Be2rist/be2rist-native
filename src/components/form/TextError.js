import {Text} from 'react-native-paper';
import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {useTranslation} from 'react-i18next';

const TextError = ({error, touched}) => {
  const {t} = useTranslation();
  return (
    touched &&
    error && (
      <Text style={styles.error} variant="labelSmall">
        {t(error)}
      </Text>
    )
  );
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
    marginLeft: 5,
  },
});

export default TextError;

TextError.propTypes = {
  error: PropTypes.string,
  touched: PropTypes.bool,
};

TextError.defaultProps = {
  error: null,
  touched: false,
};
