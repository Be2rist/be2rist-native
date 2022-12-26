import React from 'react';
import PropTypes from 'prop-types';
import ElementFormFields from 'components/form/ElementFormFields';

const RouteFormFields = ({
  showLanguageDialog,
  getState,
  googleDriveMetadata,
  showLocationDialog,
  showImageGoogleDrive,
}) => (
  <ElementFormFields
    getState={getState}
    googleDriveMetadata={googleDriveMetadata}
    showImageGoogleDrive={showImageGoogleDrive}
    showLocationDialog={showLocationDialog}
    showLanguageDialog={showLanguageDialog}
  />
);

export default RouteFormFields;

RouteFormFields.propTypes = {
  showLanguageDialog: PropTypes.func.isRequired,
  getState: PropTypes.func.isRequired,
  googleDriveMetadata: PropTypes.object.isRequired,
  showImageGoogleDrive: PropTypes.func.isRequired,
  showLocationDialog: PropTypes.func.isRequired,
};
