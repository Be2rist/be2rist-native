import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useSelector} from 'react-redux';
import {selectRoute} from 'services/redux/routeSlice';
import AudioPlayer from 'components/player/AudioPlayer';
import {SettingsContext} from 'SettingsProvider';
import RouteCard from 'components/route/RouteCard';
import {Text} from 'react-native-paper';
import {getDistance} from 'geolib';
import {GeoLocationContext} from 'GeoLocationProvider';
import CloseButton from 'components/custom/CloseButton';
import PlayRoutePreview from 'components/route/PlayRoutePreview';

// TODO: Move to the firebase #8
const pointArea = 20;

const PlayRoutePage = () => {
  const route = useSelector(state => selectRoute(state));
  const [pointIndex, setPointIndex] = useState(null);
  const [nearbyPoint, setNearbyPoint] = useState(null);
  const [playRoute, setPlayRoute] = useState(false);
  const {
    settings: {theme},
  } = useContext(SettingsContext);
  const isDarkMode = theme === 'dark';
  const {position, enabled: gpsEnabled} = useContext(GeoLocationContext);

  useEffect(() => {
    if (gpsEnabled) {
      let closeIn = route?.points
        .map((item, index) => {
          const location = {
            latitude: item.location._latitude,
            longitude: item.location._longitude,
          };
          return {index, distance: getDistance(position, location)};
        })
        .sort((a, b) => b.distance - a.distance)
        .pop();
      setNearbyPoint(closeIn?.distance);
      if (
        closeIn?.distance < pointArea &&
        pointIndex !== closeIn.index + 1 &&
        playRoute
      ) {
        setPointIndex(closeIn.index + 1);
      }
    }
  }, [gpsEnabled, playRoute, pointIndex, position, route?.points]);

  const mediaResolver = currentPoint => {
    switch (currentPoint.contentType) {
      case 'sound-collage':
        return (
          <AudioPlayer
            key={currentPoint.id}
            point={currentPoint}
            close={stopPlaying}
            disablePointControls={gpsEnabled}
            showNext={showNext}
            showPrevious={showPrevious}
            isFirst={pointIndex === 1}
            isLast={route.points.length === pointIndex}
          />
        );
      default:
        return <View />;
    }
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

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
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {route && !pointIndex && (
          <>
            <CloseButton />
            {gpsEnabled && <Text>{nearbyPoint}</Text>}
            {gpsEnabled && playRoute && <PlayRoutePreview route={route} />}
            {!playRoute && <RouteCard route={route} onPlay={onPlayRoute} />}
          </>
        )}
        {route &&
          playRoute &&
          pointIndex &&
          route.points[pointIndex - 1] &&
          mediaResolver(route.points[pointIndex - 1])}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlayRoutePage;
