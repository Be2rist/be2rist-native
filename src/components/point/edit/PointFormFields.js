import React from 'react';
import {TextInput} from 'react-native-paper';
import TextInputField from 'components/form/TextInputField';
import {required} from 'utils/validation';
import {useTranslation} from 'react-i18next';
import PropTypes from 'prop-types';
import {imageName} from 'components/form/formOptions';
import ElementFormFields from 'components/form/ElementFormFields';

const PointFormFields = ({
  showLanguageDialog,
  getState,
  googleDriveMetadata,
  showLocationDialog,
  showImageGoogleDrive,
  showMediaGoogleDrive,
}) => {
  const {t} = useTranslation();
  return (
    <>
      <ElementFormFields
        getState={getState}
        googleDriveMetadata={googleDriveMetadata}
        showImageGoogleDrive={showImageGoogleDrive}
        showLocationDialog={showLocationDialog}
        showLanguageDialog={showLanguageDialog}
      />
      <TextInputField
        keyboardType="numeric"
        name="radius"
        label={t('point.edit.label.radius')}
        validate={required}
      />
      <TextInputField
        name="audioContent"
        label={t('point.edit.label.sound')}
        validate={required}
        render={imageName(googleDriveMetadata, getState().values?.audioContent)}
        right={
          <TextInput.Icon
            disabled={googleDriveMetadata.loading}
            icon="image-edit-outline"
            onPress={showMediaGoogleDrive}
          />
        }
      />
    </>
  );
};

export default PointFormFields;

PointFormFields.propTypes = {
  showLanguageDialog: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired,
  googleDriveMetadata: PropTypes.object.isRequired,
  showImageGoogleDrive: PropTypes.func.isRequired,
  showLocationDialog: PropTypes.func.isRequired,
  showMediaGoogleDrive: PropTypes.func.isRequired,
};
