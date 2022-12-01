import React, {useContext} from 'react';
import {View} from 'react-native';
import {
  Colors,
  Header,
  LearnMoreLinks,
} from 'react-native/Libraries/NewAppScreen';
import Section from 'components/root/Section';
import {SettingsContext} from 'SettingsProvider';

const SharingPage = () => {
  const {
    settings: {theme},
  } = useContext(SettingsContext);
  const isDarkMode = theme === 'dark';
  return (
    <>
      <Header />
      <View
        style={{
          backgroundColor: isDarkMode ? Colors.black : Colors.white,
        }}>
        <Section title="Sharing Page">
          Read the docs to discover what to do next:
        </Section>
        <LearnMoreLinks />
      </View>
    </>
  );
};

export default SharingPage;
