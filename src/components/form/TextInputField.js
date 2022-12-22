import React from 'react';
import {Field} from 'react-final-form';
import {TextInput} from 'react-native-paper';
import PropTypes from 'prop-types';
import TextError from 'components/form/TextError';

const renderTextField = ({
  label,
  input,
  required,
  readonly,
  placeholder,
  meta: {touched, invalid, error},
  ...custom
}) => (
  <>
    <TextInput
      label={label}
      placeholder={placeholder}
      error={touched && invalid}
      editable={!readonly}
      {...input}
      {...custom}
    />
    <TextError error={error} touched={touched} />
  </>
);

renderTextField.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  input: PropTypes.object,
  readonly: PropTypes.bool,
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    invalid: PropTypes.bool,
    error: PropTypes.string,
  }),
};

renderTextField.defaultProps = {
  label: null,
  placeholder: null,
  input: {},
  readonly: false,
  meta: {},
};

const TextInputField = ({...props}) => (
  <Field {...props} component={renderTextField} />
);

export default TextInputField;
