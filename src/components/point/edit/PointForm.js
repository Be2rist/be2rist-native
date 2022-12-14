import React from 'react';
import PropTypes from 'prop-types';
import ElementFormHandler from 'components/form/ElementFormHandler';
import PointFormFields from 'components/point/edit/PointFormFields';

const PointForm = ({point, onSubmit}) => (
  <ElementFormHandler
    onSubmit={onSubmit}
    item={point}
    FormFields={PointFormFields}
  />
);

export default PointForm;

PointForm.propTypes = {
  point: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    cover: PropTypes.string,
    audioContent: PropTypes.string,
    contentType: PropTypes.string,
    location: PropTypes.shape({
      _latitude: PropTypes.number,
      _longitude: PropTypes.number,
    }),
    language: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
