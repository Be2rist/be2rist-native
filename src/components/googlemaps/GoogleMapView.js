import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import React, {useContext} from 'react';
import {SettingsContext} from 'SettingsProvider';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {GeolocationFlow} from 'GeoLocationProvider';

const GoogleMapView = ({
  children,
  showsUserLocation,
  initialRegion,
  initialDelta,
}) => {
  const {
    settings: {theme},
  } = useContext(SettingsContext);
  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={showsUserLocation}
      maxZoomLevel={20}
      userLocationPriority="high"
      showsIndoorLevelPicker
      userInterfaceStyle={theme}
      initialRegion={{
        latitude: initialRegion.latitude || GeolocationFlow.location.latitude,
        longitude:
          initialRegion.longitude || GeolocationFlow.location.longitude,
        latitudeDelta: initialDelta.latitudeDelta,
        longitudeDelta: initialDelta.longitudeDelta,
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
  showsUserLocation: PropTypes.bool,
  initialRegion: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
  }),
  initialDelta: PropTypes.shape({
    latitudeDelta: PropTypes.number,
    longitudeDelta: PropTypes.number,
  }),
};

GoogleMapView.defaultProps = {
  children: <></>,
  showsUserLocation: true,
  initialRegion: {},
  initialDelta: {
    latitudeDelta: 0.00922,
    longitudeDelta: 0.00922,
  },
};
