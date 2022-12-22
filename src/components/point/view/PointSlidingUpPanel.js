import React, {useMemo} from 'react';
import PointSlidingUpPreview from 'components/point/view/PointSlidingUpPreview';
import PropTypes from 'prop-types';
import SlidingUpMainMenuPanel from 'components/custom/slidingup/SlidingUpMainMenuPanel';

const PointSlidingUpPanel = ({
  point,
  distance,
  isNearby,
  mapDimension,
  setPlayingPoint,
  clearPoint,
}) => {
  const PointViewComponent = useMemo(
    () => (
      <PointSlidingUpPreview
        clearPoint={clearPoint}
        isNearby={isNearby}
        point={point}
        distance={distance}
        setPlayingPoint={setPlayingPoint}
      />
    ),
    [clearPoint, distance, isNearby, point, setPlayingPoint],
  );

  return (
    <SlidingUpMainMenuPanel
      viewDimension={mapDimension}
      children={PointViewComponent}
    />
  );
};

export default PointSlidingUpPanel;

PointSlidingUpPanel.propTypes = {
  point: PropTypes.object.isRequired,
  distance: PropTypes.number.isRequired,
  isNearby: PropTypes.bool.isRequired,
  mapDimension: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
  setPlayingPoint: PropTypes.func.isRequired,
  clearPoint: PropTypes.func.isRequired,
};
