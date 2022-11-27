import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import React, {useContext} from 'react';
import {SettingsContext} from 'SettingsProvider';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const GoogleMapView = ({position, children}) => {
  const {
    settings: {theme},
  } = useContext(SettingsContext);
  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      showsUserLocation
      maxZoomLevel={18}
      userLocationPriority="high"
      showsIndoorLevelPicker
      userInterfaceStyle={theme}
      region={{...position, latitudeDelta: 0, longitudeDelta: 0}}>
      {children}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default GoogleMapView;

GoogleMapView.propTypes = {
  position: PropTypes.object.isRequired,
  children: PropTypes.node,
};

GoogleMapView.defaultProps = {
  children: <></>,
};
