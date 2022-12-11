import React from 'react';
import {IconButton, Text} from 'react-native-paper';
import {Platform, Slider, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

const PointFilter = ({radius, radiusChanged}) => (
  <View style={styles.radius}>
    <IconButton icon="map-marker-radius" />
    <Slider
      onSlidingComplete={radiusChanged}
      value={radius}
      minimumValue={0}
      maximumValue={25}
      step={0.1}
      maximumTrackTintColor="gray"
      minimumTrackTintColor={'white'}
      thumbTintColor={'white'}
      style={styles.slider}
    />
    <Text variant="titleMedium">{radius.toFixed(1)}</Text>
  </View>
);

const styles = StyleSheet.create({
  radius: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  slider: {
    width: 250,
    height: 30,
    borderRadius: 50,
    flex: 1,
    alignSelf: 'center',
    marginHorizontal: Platform.select({ios: 5}),
  },
});

export default PointFilter;

PointFilter.propTypes = {
  radius: PropTypes.number.isRequired,
  radiusChanged: PropTypes.func.isRequired,
};
