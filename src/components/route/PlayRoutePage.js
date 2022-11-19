import React, {useContext, useState} from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {useSelector} from 'react-redux';
import {selectRoute} from 'services/redux/routeSlice';
import AudioPlayer from 'components/player/AudioPlayer';
import {SettingsContext} from 'SettingsProvider';
import RouteCard from 'components/route/RouteCard';

const PlayRoutePage = () => {
  const route = useSelector(state => selectRoute(state));
  const [point, setPoint] = useState(null);
  const {
    settings: {theme},
  } = useContext(SettingsContext);
  const isDarkMode = theme === 'dark';

  const mediaResolver = currentPoint => {
    switch (currentPoint.contentType) {
      case 'sound-collage':
        return (
          <AudioPlayer
            key={currentPoint.id}
            point={currentPoint}
            close={() => setPoint(null)}
          />
        );
      default:
        return <View />;
    }
  };
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
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
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          {route && !point && (
            <RouteCard route={route} onPlay={() => setPoint(1)} />
          )}
          {route &&
            point &&
            route.points[point - 1] &&
            mediaResolver(route.points[point - 1])}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PlayRoutePage;
