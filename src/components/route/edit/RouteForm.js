import React from 'react';
import ElementFormHandler from 'components/form/ElementFormHandler';
import PropTypes from 'prop-types';
import RouteFormFields from 'components/route/edit/RouteFormFields';

const RouteForm = ({route, onSubmit}) => (
  <ElementFormHandler
    onSubmit={onSubmit}
    item={route}
    FormFields={RouteFormFields}
  />
);

export default RouteForm;

RouteForm.propTypes = {
  route: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    cover: PropTypes.string,
    location: PropTypes.shape({
      _latitude: PropTypes.number,
      _longitude: PropTypes.number,
    }),
    language: PropTypes.string,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
