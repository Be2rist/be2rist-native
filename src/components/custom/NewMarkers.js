import React, {useCallback} from 'react';
import {Marker} from 'react-native-maps';
import {MARKER} from 'images';
import PropTypes from 'prop-types';

const NewMarkers = ({points, setPoint}) => {
  const onSetPoint = useCallback(point => () => setPoint(point), [setPoint]);
  return points.map(point => (
    <Marker
      key={point.id}
      title={point.name}
      onPress={onSetPoint(point)}
      image={MARKER}
      coordinate={{
        latitude: point.location._latitude,
        longitude: point.location._longitude,
      }}
    />
  ));
};

const Memo = React.memo(NewMarkers);

export default Memo;

Memo.propTypes = {
  points: PropTypes.array.isRequired,
  setPoint: PropTypes.func,
};

Memo.defaultProps = {
  setPoint: () => {},
};
