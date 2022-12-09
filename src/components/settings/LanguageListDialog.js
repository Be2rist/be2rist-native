import * as React from 'react';
import {View} from 'react-native';
import {
  Button,
  Dialog,
  Portal,
  Provider,
  RadioButton,
} from 'react-native-paper';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import languages from 'languages';

const LanguageListDialog = ({visible, hideDialog, changeLanguage}) => {
  const {t, i18n} = useTranslation();
  const [value, setValue] = React.useState(i18n.language);
  const onChange = newValue => setValue(newValue);
  const onSave = () => changeLanguage(value);

  return (
    <Provider>
      <View>
        <Portal>
          <Dialog visible={visible} onDismiss={hideDialog}>
            <Dialog.Title>{t('settings.chooseLanguage')}</Dialog.Title>
            <Dialog.Content>
              <RadioButton.Group onValueChange={onChange} value={value}>
                {languages.map(lng => (
                  <RadioButton.Item
                    key={lng.lng}
                    label={lng.name}
                    value={lng.lng}
                  />
                ))}
              </RadioButton.Group>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={onSave}>OK</Button>
              <Button onPress={hideDialog}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    </Provider>
  );
};

export default LanguageListDialog;

LanguageListDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  hideDialog: PropTypes.func.isRequired,
  changeLanguage: PropTypes.func.isRequired,
};
