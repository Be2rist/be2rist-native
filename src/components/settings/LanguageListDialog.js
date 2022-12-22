import * as React from 'react';
import {Button, Dialog, RadioButton} from 'react-native-paper';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import languages from 'languages';

const LanguageListDialog = ({
  visible,
  hideDialog,
  changeLanguage,
  initialValue,
}) => {
  const {t, i18n} = useTranslation();
  const [value, setValue] = React.useState(initialValue || i18n.language);
  const onChange = newValue => setValue(newValue);
  const onSave = () => changeLanguage(value);

  return (
    <Dialog visible={visible} onDismiss={hideDialog}>
      <Dialog.Title>{t('settings.chooseLanguage')}</Dialog.Title>
      <Dialog.Content>
        <RadioButton.Group onValueChange={onChange} value={value}>
          {languages.map(lng => (
            <RadioButton.Item key={lng.lng} label={lng.name} value={lng.lng} />
          ))}
        </RadioButton.Group>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onSave}>OK</Button>
        <Button onPress={hideDialog}>Cancel</Button>
      </Dialog.Actions>
    </Dialog>
  );
};

export default LanguageListDialog;

LanguageListDialog.propTypes = {
  initialValue: PropTypes.string,
  visible: PropTypes.bool.isRequired,
  hideDialog: PropTypes.func.isRequired,
  changeLanguage: PropTypes.func.isRequired,
};
