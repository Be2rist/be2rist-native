import React, {useCallback} from 'react';
import {Marker} from 'react-native-maps';
import {MARKER} from 'images';
import PropTypes from 'prop-types';
import {Image, StyleSheet} from 'react-native';

const NewMarkers = ({points, setPoint}) => {
  const onSetPoint = useCallback(point => () => setPoint(point), [setPoint]);
  return points.map(point => (
    <Marker
      key={point.id}
      testID={`new-marker-${point.id}`}
      title={point.name}
      onPress={onSetPoint(point)}
      tracksViewChanges={false}
      coordinate={{
        latitude: point.location._latitude,
        longitude: point.location._longitude,
      }}>
      <Image source={MARKER} style={styles.markerImage} />
    </Marker>
  ));
};

const styles = StyleSheet.create({
  markerImage: {
    height: 29,
    width: 24,
  },
});

const Memo = React.memo(NewMarkers);

export default Memo;

Memo.propTypes = {
  points: PropTypes.array.isRequired,
  setPoint: PropTypes.func,
};

Memo.defaultProps = {
  setPoint: () => {},
};
