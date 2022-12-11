import {useEffect, useState} from 'react';
import {getDistance} from 'geolib';

// TODO: Move to the firebase #8
const pointArea = 20;

const useNearbyPoint = (points, position, gpsEnabled) => {
  const [point, setPoint] = useState(null);
  const [index, setIndex] = useState(null);
  const [reached, setReached] = useState(false);
  const [distance, setDistance] = useState(null);
  useEffect(() => {
    if (gpsEnabled && points) {
      const closeIn = points
        .map((item, ind) => {
          const location = {
            latitude: item.location._latitude,
            longitude: item.location._longitude,
          };
          return {
            point: item,
            index: ind,
            distance: getDistance(position, location),
          };
        })
        .sort((a, b) => b.distance - a.distance)
        .pop();
      point?.id !== closeIn?.point.id &&
        setPoint(closeIn.point) &&
        setIndex(closeIn.index);
      closeIn?.distance &&
        closeIn.distance !== distance &&
        setDistance(closeIn?.distance);
      point && distance < pointArea && setReached(true);
      point && distance > pointArea && setReached(false);
    }
  }, [distance, gpsEnabled, point, points, position]);
  return [point, distance, reached, index];
};

export default useNearbyPoint;
