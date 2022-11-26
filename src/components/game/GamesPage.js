import React, {useContext} from 'react';
import {SafeAreaView, ScrollView, StatusBar, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import Section from 'components/root/Section';
import {SettingsContext} from 'SettingsProvider';

const GamesPage = () => {
  const {
    settings: {theme},
  } = useContext(SettingsContext);
  const isDarkMode = theme === 'dark';

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
          <Section title="Games Page" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default GamesPage;
