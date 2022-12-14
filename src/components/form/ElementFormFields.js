import React from 'react';
import {TextInput, TouchableRipple} from 'react-native-paper';
import TextInputField from 'components/form/TextInputField';
import {required} from 'utils/validation';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import {imageName, languageOption} from 'components/form/formOptions';

const ElementFormFields = ({
  showLanguageDialog,
  getState,
  googleDriveMetadata,
  showLocationDialog,
  showImageGoogleDrive,
}) => {
  const {t} = useTranslation();
  return (
    <>
      <TextInputField
        name="name"
        label={t('point.edit.label.name')}
        validate={required}
      />
      <TouchableRipple
        onPress={showLanguageDialog}
        rippleColor="rgba(0, 0, 0, .32)">
        <TextInputField
          readonly
          name="language"
          label={t('point.edit.label.language')}
          validate={required}
          render={languageOption(getState().values?.language)}
        />
      </TouchableRipple>
      <TextInputField
        name="cover"
        label={t('point.edit.label.cover')}
        validate={required}
        render={imageName(googleDriveMetadata, getState().values?.cover)}
        right={
          <TextInput.Icon
            disabled={googleDriveMetadata.loading}
            icon="image-edit-outline"
            onPress={showImageGoogleDrive}
          />
        }
      />
      <TextInputField
        keyboardType="numeric"
        name="location._latitude"
        label={t('point.edit.label.latitude')}
        validate={required}
        right={
          <TextInput.Icon icon="google-maps" onPress={showLocationDialog} />
        }
      />
      <TextInputField
        keyboardType="numeric"
        name="location._longitude"
        label={t('point.edit.label.longitude')}
        validate={required}
      />
      <TextInputField
        name="description"
        label={t('point.edit.label.description')}
        multiline
        numberOfLines={3}
      />
    </>
  );
};

export default ElementFormFields;

ElementFormFields.propTypes = {
  showLanguageDialog: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired,
  googleDriveMetadata: PropTypes.object.isRequired,
  showImageGoogleDrive: PropTypes.func.isRequired,
  showLocationDialog: PropTypes.func.isRequired,
};
