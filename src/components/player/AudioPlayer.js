import React, {useEffect, useMemo, useState} from 'react';
import * as PropTypes from 'prop-types';
import {ActivityIndicator, IconButton, Text} from 'react-native-paper';
import Sound from 'react-native-sound';
import {
  useWindowDimensions,
  StyleSheet,
  ImageBackground,
  Platform,
  Slider,
  View,
} from 'react-native';

const getAudioTimeString = seconds => {
  const h = parseInt(seconds / (60 * 60), 10);
  const m = parseInt((seconds % (60 * 60)) / 60, 10);
  const s = parseInt(seconds % 60, 10);

  return (
    (h < 10 ? '0' + h : h) +
    ':' +
    (m < 10 ? '0' + m : m) +
    ':' +
    (s < 10 ? '0' + s : s)
  );
};

const AudioPlayer = ({
  point,
  close,
  showPrevious,
  showNext,
  isLast,
  isFirst,
}) => {
  const {height, width} = useWindowDimensions();
  const timeMap = useMemo(() => {
    const images = [...point.images];
    images.sort((a, b) => {
      if (a.time < b.time) {
        return -1;
      }
      if (a.time > b.time) {
        return 1;
      }
      return 0;
    });
    return images;
  }, [point]);
  const [currentImage, setCurrentImage] = useState(timeMap[0]);
  const [sound, setSound] = useState(null);
  const [soundLoaded, setSoundLoaded] = useState(false);
  const [playState, setPlayState] = useState('paused');
  const [playSeconds, setPlaySeconds] = useState(0);
  const [sliderEditing, setSliderEditing] = useState(false);
  const [duration, setDuration] = useState(0);
  const [loop, setLoop] = useState(0);
  const styles = useMemo(() => createStyles({width, height}), [width, height]);

  useEffect(() => {
    onPlay();
    return releaseSound;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const interval = setInterval(() => setLoop(Math.random()), 200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (
      sound &&
      sound.isLoaded() &&
      playState === 'playing' &&
      !sliderEditing
    ) {
      sound.getCurrentTime((seconds, isPlaying) => {
        setPlaySeconds(seconds);
        setImageByTime(seconds);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loop, playState, sliderEditing, sound]);

  const currentTimeString = useMemo(
    () => getAudioTimeString(playSeconds),
    [playSeconds],
  );
  const durationString = useMemo(
    () => getAudioTimeString(duration),
    [duration],
  );

  const setImageByTime = time => {
    let imageKey = timeMap[0];
    for (const timeMapKey of timeMap) {
      if (time > timeMapKey.time) {
        imageKey = timeMapKey;
      } else {
        break;
      }
    }
    if (imageKey !== currentImage) {
      setCurrentImage(imageKey);
    }
  };

  const releaseSound = () => {
    sound?.release();
  };

  const onClose = () => {
    releaseSound();
    setSound(null);
    close();
  };

  const onPause = () => {
    sound?.pause();
    setPlayState('paused');
  };

  const onPlay = () => {
    if (sound) {
      sound.play(playComplete);
      setPlayState('playing');
    } else {
      const loadSound = new Sound(point.audioContent, null, error => {
        setSoundLoaded(true);
        if (error) {
          setPlayState('paused');
        } else {
          setSound(loadSound);
          setPlayState('playing');
          setDuration(loadSound.getDuration());
          loadSound.play(playComplete);
        }
      });
    }
  };

  const playComplete = () => {
    if (sound) {
      sound.setCurrentTime(0);
      setPlaySeconds(0);
      setPlayState('paused');
    }
  };

  const onSliderEditStart = () => {
    setSliderEditing(true);
  };

  const onSliderEditEnd = value => {
    setSliderEditing(false);
  };

  const onSliderEditing = value => {
    if (sound) {
      sound.setCurrentTime(value);
      setPlaySeconds(value);
    }
  };

  const clickPause = () =>
    sound?.isLoaded() && (playState === 'paused' ? onPlay() : onPause());

  const onShowNext = () => {
    sound?.release();
    setSound(null);
    showNext();
  };

  const onShowPrevious = () => {
    sound?.release();
    setSound(null);
    showPrevious();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{uri: currentImage.image}}
        resizeMethod="resize"
        style={styles.image}>
        <View style={styles.closeButton}>
          <IconButton
            icon="close"
            size={50}
            onPress={onClose}
            disabled={!soundLoaded}
          />
        </View>
        <View style={styles.previousButton}>
          <IconButton
            icon="skip-previous"
            size={50}
            onPress={onShowPrevious}
            disabled={isFirst || !soundLoaded}
          />
        </View>
        <View style={styles.nextButton}>
          <IconButton
            icon="skip-next"
            size={50}
            onPress={onShowNext}
            disabled={isLast || !soundLoaded}
          />
        </View>
        <View style={styles.playButton}>
          {soundLoaded ? (
            <IconButton
              icon={playState === 'paused' ? 'play' : 'pause'}
              size={50}
              onPress={clickPause}
            />
          ) : (
            <ActivityIndicator
              size={45}
              animating={true}
              style={styles.loadingSpinner}
            />
          )}
        </View>
        <View style={styles.controls}>
          <Text style={styles.time}>{currentTimeString}</Text>
          <Slider
            onTouchStart={onSliderEditStart}
            onTouchEnd={onSliderEditEnd}
            onValueChange={onSliderEditing}
            onSlidingComplete={onSliderEditing}
            value={playSeconds}
            maximumValue={duration}
            maximumTrackTintColor="gray"
            minimumTrackTintColor="white"
            thumbTintColor="white"
            style={styles.slider}
          />
          <Text style={styles.duration}>{durationString}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const createStyles = ({width, height}) =>
  StyleSheet.create({
    container: {
      flex: 1,
      height: height - 30,
      width: width - 1,
    },
    image: {
      flex: 1,
      justifyContent: 'center',
    },
    closeButton: {
      position: 'absolute',
      left: 1,
      top: 1,
    },
    previousButton: {
      position: 'absolute',
      left: 25,
      top: height * 0.5 - 55,
    },
    nextButton: {
      position: 'absolute',
      right: 25,
      top: height * 0.5 - 55,
    },
    playButton: {
      position: 'absolute',
      left: width * 0.5 - 35,
      top: height * 0.5 - 55,
    },
    controls: {
      position: 'absolute',
      bottom: 30,
      marginHorizontal: 15,
      flexDirection: 'row',
    },
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
    loadingSpinner: {
      marginLeft: 15,
      marginTop: 15,
    },
  });

export default React.memo(AudioPlayer);

AudioPlayer.propTypes = {
  point: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  showPrevious: PropTypes.func.isRequired,
  showNext: PropTypes.func.isRequired,
  isLast: PropTypes.bool.isRequired,
  isFirst: PropTypes.bool.isRequired,
};
