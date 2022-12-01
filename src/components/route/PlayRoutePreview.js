import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Marker} from 'react-native-maps';
import PropTypes from 'prop-types';
import GoogleMapView from 'components/googlemaps/GoogleMapView';
import {GeolocationFlow} from 'GeoLocationProvider';

const PlayRoutePreview = ({route}) => {
  const startPosition = useMemo(() => GeolocationFlow.location, []);
  return (
    <View style={styles.container}>
      <GoogleMapView position={startPosition}>
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
      </GoogleMapView>
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
});

export default PlayRoutePreview;

PlayRoutePreview.propTypes = {
  route: PropTypes.object.isRequired,
};
