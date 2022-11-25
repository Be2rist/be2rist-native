import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {SettingsContext} from 'SettingsProvider';
import PropTypes from 'prop-types';

const PlayRoutePreview = ({route}) => {
  const {
    settings: {theme},
  } = useContext(SettingsContext);
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        maxZoomLevel={18}
        userLocationPriority="high"
        showsIndoorLevelPicker
        userInterfaceStyle={theme}
        region={{
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0,
          longitudeDelta: 0,
        }}>
        {route.points.map(({id, name, location}) => (
          <Marker
            key={id}
            title={name}
            coordinate={{
              latitude: location._latitude,
              longitude: location._longitude,
            }}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default PlayRoutePreview;

PlayRoutePreview.propTypes = {
  route: PropTypes.object.isRequired,
};
