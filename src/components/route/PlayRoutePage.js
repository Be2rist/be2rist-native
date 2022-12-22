import React, {useContext, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {selectRoute} from 'services/redux/routeSlice';
import RouteCard from 'components/route/RouteCard';
import {GeoLocationContext} from 'GeoLocationProvider';
import CloseButton from 'components/custom/CloseButton';
import PlayRoutePreview from 'components/route/PlayRoutePreview';
import MediaResolver from 'components/player/MediaResolver';
import BackgroundScrollView from 'components/custom/BackgroundScrollView';
import useNearbyPoint from 'components/point/useNearbyPoint';

const PlayRoutePage = () => {
  const route = useSelector(selectRoute);
  const [pointIndex, setPointIndex] = useState(null);
  const [playRoute, setPlayRoute] = useState(false);
  const {position, enabled: gpsEnabled} = useContext(GeoLocationContext);
  const [nearbyPoint, distance, reached, nearbyIndex] = useNearbyPoint(
    route?.points,
    position,
    gpsEnabled,
  );

  useEffect(() => {
    nearbyPoint &&
      reached &&
      pointIndex !== nearbyIndex + 1 &&
      playRoute &&
      setPointIndex(nearbyIndex + 1);
  }, [distance, nearbyIndex, nearbyPoint, playRoute, pointIndex, reached]);

  const showPrevious = () => {
    if (pointIndex > 1) {
      setPointIndex(pointIndex - 1);
    }
  };

  const showNext = () => {
    if (pointIndex < route.points.length) {
      setPointIndex(pointIndex + 1);
    }
  };

  const onPlayRoute = () => {
    setPlayRoute(true);
    if (!gpsEnabled) {
      setPointIndex(1);
    }
  };

  const stopPlaying = () => {
    setPlayRoute(false);
    setPointIndex(null);
  };

  return (
    <BackgroundScrollView>
      {route && !pointIndex && (
        <>
          <CloseButton />
          {gpsEnabled && playRoute && <PlayRoutePreview route={route} />}
          {!playRoute && <RouteCard route={route} onPlay={onPlayRoute} />}
        </>
      )}
      {route && playRoute && pointIndex && route.points[pointIndex - 1] && (
        <MediaResolver
          point={route.points[pointIndex - 1]}
          close={stopPlaying}
          disableControls={gpsEnabled}
          showNext={showNext}
          showPrevious={showPrevious}
          isFirst={pointIndex === 1}
          isLast={route.points.length === pointIndex}
        />
      )}
    </BackgroundScrollView>
  );
};

export default PlayRoutePage;
