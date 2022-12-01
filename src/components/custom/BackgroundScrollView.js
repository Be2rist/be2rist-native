import React, {useContext} from 'react';
import {SafeAreaView, ScrollView, StatusBar} from 'react-native';
import {SettingsContext} from 'SettingsProvider';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const BackgroundScrollView = ({children, dialog}) => {
  const {settings} = useContext(SettingsContext);
  const isDarkMode = settings.theme === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
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
        {children}
      </ScrollView>
      {dialog}
    </SafeAreaView>
  );
};

export default BackgroundScrollView;
