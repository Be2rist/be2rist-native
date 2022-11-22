import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useSelector} from 'react-redux';
import {selectRoute} from 'services/redux/routeSlice';
import AudioPlayer from 'components/player/AudioPlayer';
import {SettingsContext} from 'SettingsProvider';
import RouteCard from 'components/route/RouteCard';
import {IconButton, Text} from 'react-native-paper';
import {useNavigate} from 'react-router-native';
import {getDistance} from 'geolib';
import {GeoLocationContext} from 'GeoLocationProvider';

const PlayRoutePage = () => {
  const navigate = useNavigate();
  const route = useSelector(state => selectRoute(state));
  const [pointIndex, setPointIndex] = useState(null);
  const [nearbyPoint, setNearbyPoint] = useState(null);
  const {
    settings: {theme},
  } = useContext(SettingsContext);
  const isDarkMode = theme === 'dark';
  const {position} = useContext(GeoLocationContext);

  useEffect(() => {
    if (position) {
      let find = route?.points
        .map(item => {
          const location = {
            latitude: item.location._latitude,
            longitude: item.location._longitude,
          };
          return getDistance(position, location);
        })
        .sort()
        .pop();
      setNearbyPoint(find);
    }
  }, [position, route?.points]);

  const mediaResolver = currentPoint => {
    switch (currentPoint.contentType) {
      case 'sound-collage':
        return (
          <AudioPlayer
            key={currentPoint.id}
            point={currentPoint}
            close={() => setPointIndex(null)}
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

  const playRoute = () => {
    setPointIndex(1);
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
            <View
              style={{position: 'absolute', left: 1, top: 1, zIndex: 10001}}>
              {position && nearbyPoint && (
                <Text>
                  {position.latitude}
                  {position.longitude} {nearbyPoint}
                </Text>
              )}
              <IconButton
                icon="close"
                size={50}
                onPress={() => navigate('/')}
              />
            </View>
            <RouteCard route={route} onPlay={playRoute} />
          </>
        )}
        {route &&
          pointIndex &&
          route.points[pointIndex - 1] &&
          mediaResolver(route.points[pointIndex - 1])}
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlayRoutePage;
