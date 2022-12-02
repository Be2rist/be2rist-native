import React from 'react';
import {Marker} from 'react-native-maps';
import {MARKER} from 'images';
import PropTypes from 'prop-types';

const NewMarkers = ({points, setPlayingPoint}) =>
  points.map(point => (
    <Marker
      key={point.id}
      title={point.name}
      onPress={() => setPlayingPoint(point)}
      image={MARKER}
      coordinate={{
        latitude: point.location._latitude,
        longitude: point.location._longitude,
      }}
    />
  ));

const Memo = React.memo(NewMarkers);

export default Memo;

Memo.propTypes = {
  points: PropTypes.array.isRequired,
  setPlayingPoint: PropTypes.func,
};

Memo.defaultProps = {
  setPlayingPoint: () => {},
};
