import React, {useContext, useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import {Marker} from 'react-native-maps';
import PropTypes from 'prop-types';
import GoogleMapView from 'components/googlemaps/GoogleMapView';
import {GeoLocationContext} from 'GeoLocationProvider';

const PlayRoutePreview = ({route}) => {
  const {position, enabled: gpsEnabled} = useContext(GeoLocationContext);
  const startPosition = useMemo(
    () =>
      gpsEnabled && position.latitude ? position : {latitude: 0, longitude: 0},
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [gpsEnabled],
  );
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
