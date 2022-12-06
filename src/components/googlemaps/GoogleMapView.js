import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import React, {useContext} from 'react';
import {SettingsContext} from 'SettingsProvider';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {GeolocationFlow} from 'GeoLocationProvider';

const GoogleMapView = ({children}) => {
  const {
    settings: {theme},
  } = useContext(SettingsContext);
  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      showsUserLocation
      maxZoomLevel={20}
      userLocationPriority="high"
      showsIndoorLevelPicker
      userInterfaceStyle={theme}
      initialRegion={{
        ...GeolocationFlow.location,
        latitudeDelta: 0.00922,
        longitudeDelta: 0.00922,
      }}>
      {children}
    </MapView>
  );
};

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default React.memo(GoogleMapView);

GoogleMapView.propTypes = {
  children: PropTypes.node,
};

GoogleMapView.defaultProps = {
  children: <></>,
};
