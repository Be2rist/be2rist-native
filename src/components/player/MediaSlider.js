import React, {useMemo} from 'react';
import {Platform, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import Slider from '@react-native-community/slider';
import PropTypes from 'prop-types';
import {getAudioTimeString} from 'utils/timeUtils';

const MediaSlider = ({
  onSliderEditStart,
  onSliderEditEnd,
  onSliderEditing,
  playSeconds,
  duration,
}) => {
  const durationString = useMemo(
    () => getAudioTimeString(duration),
    [duration],
  );
  const currentTimeString = useMemo(
    () => getAudioTimeString(playSeconds),
    [playSeconds],
  );

  return (
    <>
      <Text style={styles.time}>{currentTimeString}</Text>
      <Slider
        onTouchStart={onSliderEditStart}
        onTouchEnd={onSliderEditEnd}
        onSlidingComplete={onSliderEditing}
        value={playSeconds}
        maximumValue={duration}
        maximumTrackTintColor="gray"
        minimumTrackTintColor="white"
        thumbTintColor="white"
        style={styles.slider}
      />
      <Text style={styles.duration}>{durationString}</Text>
    </>
  );
};

const styles = StyleSheet.create({
  time: {
    color: 'white',
    alignSelf: 'center',
  },
  slider: {
    flex: 1,
    alignSelf: 'center',
    marginHorizontal: Platform.select({ios: 5}),
  },
  duration: {
    color: 'white',
    alignSelf: 'center',
  },
});

export default React.memo(MediaSlider);

MediaSlider.propTypes = {
  onSliderEditStart: PropTypes.func.isRequired,
  onSliderEditEnd: PropTypes.func.isRequired,
  onSliderEditing: PropTypes.func.isRequired,
  playSeconds: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
};
