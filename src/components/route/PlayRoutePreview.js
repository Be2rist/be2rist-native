import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import GoogleMapView from 'components/googlemaps/GoogleMapView';
import NewMarkers from 'components/custom/NewMarkers';

const PlayRoutePreview = ({route}) => {
  const Markers = useMemo(
    () => <NewMarkers points={route.points} />,
    [route.points],
  );
  return (
    <View style={styles.container}>
      <GoogleMapView children={Markers} />
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

const Memo = React.memo(PlayRoutePreview);

export default Memo;

Memo.propTypes = {
  route: PropTypes.object.isRequired,
};
