import React, {useCallback, useEffect, useMemo, useState} from 'react';
import * as PropTypes from 'prop-types';
import {ActivityIndicator, IconButton} from 'react-native-paper';
import Sound from 'react-native-sound';
import {
  useWindowDimensions,
  StyleSheet,
  ImageBackground,
  Platform,
  View,
  TouchableOpacity,
} from 'react-native';
import {audioLink, imageLink} from 'utils/googleLinks';
import {createAudioCollage} from 'utils/pointContentUtils';
import MediaSlider from 'components/player/MediaSlider';

const AudioPlayer = ({
  point,
  close,
  showPrevious,
  showNext,
  isLast,
  disablePointControls,
  isFirst,
}) => {
  const {height, width} = useWindowDimensions();
  const audioCollage = useMemo(() => createAudioCollage(point), [point]);
  const [currentImage, setCurrentImage] = useState(audioCollage[0]);
  const [sound, setSound] = useState(null);
  const [soundLoaded, setSoundLoaded] = useState(false);
  const [playState, setPlayState] = useState('paused');
  const [playSeconds, setPlaySeconds] = useState(0);
  const [sliderEditing, setSliderEditing] = useState(false);
  const [duration, setDuration] = useState(0);
  const [loop, setLoop] = useState(0);
  const styles = useMemo(() => createStyles({width, height}), [width, height]);

  const releaseSound = useCallback(() => {
    sound?.release();
  }, [sound]);

  const onClose = useCallback(() => {
    releaseSound();
    setSound(null);
    close();
  }, [close, releaseSound]);

  const playComplete = useCallback(() => {
    if (disablePointControls) {
      onClose();
    } else {
      setPlaySeconds(0);
      setPlayState('paused');
      sound?.setCurrentTime(0);
    }
  }, [disablePointControls, onClose, sound]);

  const onPlay = useCallback(() => {
    if (sound) {
      sound.play(playComplete);
      setPlayState('playing');
    } else {
      const loadSound = new Sound(
        audioLink(point.audioContent),
        null,
        error => {
          setSoundLoaded(true);
          if (error) {
            setPlayState('paused');
          } else {
            setSound(loadSound);
            setPlayState('playing');
            setDuration(loadSound.getDuration());
            loadSound.play(playComplete);
          }
        },
      );
    }
  }, [playComplete, point.audioContent, sound]);

  const setImageByTime = useCallback(
    time => {
      let imageKey = audioCollage[0];
      for (const timeMapKey of audioCollage) {
        if (time > timeMapKey.time) {
          imageKey = timeMapKey;
        } else {
          break;
        }
      }
      if (imageKey !== currentImage) {
        setCurrentImage(imageKey);
      }
    },
    [currentImage, audioCollage],
  );

  useEffect(() => {
    onPlay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [point]);

  useEffect(() => {
    return () => releaseSound();
  }, [releaseSound, sound]);

  useEffect(() => {
    const interval = setInterval(() => setLoop(Math.random()), 500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (
      sound &&
      sound.isLoaded() &&
      playState === 'playing' &&
      !sliderEditing
    ) {
      sound.getCurrentTime(seconds => {
        setPlaySeconds(seconds);
        setImageByTime(seconds);
      });
    }
  }, [loop, playState, setImageByTime, sliderEditing, sound]);

  const onPause = useCallback(() => {
    sound?.pause();
    setPlayState('paused');
  }, [sound]);

  const onSliderEditStart = useCallback(() => {
    setSliderEditing(true);
  }, []);

  const onSliderEditEnd = useCallback(() => {
    setSliderEditing(false);
  }, []);

  const onSliderEditing = useCallback(
    value => {
      if (sound) {
        sound.setCurrentTime(value);
        setPlaySeconds(value);
      }
    },
    [sound],
  );

  const clickPause = useCallback(
    () => sound?.isLoaded() && (playState === 'paused' ? onPlay() : onPause()),
    [onPause, onPlay, playState, sound],
  );

  const onShowNext = useCallback(() => {
    sound?.release();
    setSound(null);
    showNext();
  }, [showNext, sound]);

  const onShowPrevious = useCallback(() => {
    sound?.release();
    setSound(null);
    showPrevious();
  }, [showPrevious, sound]);

  return (
    <TouchableOpacity
      testID="touchable-player"
      activeOpacity={1}
      style={styles.container}
      onPress={clickPause}>
      <ImageBackground
        testID="background"
        source={{uri: imageLink(currentImage.image)}}
        resizeMethod="resize"
        style={styles.image}>
        <View style={styles.closeButton}>
          <IconButton
            testID="close-button"
            icon="close"
            size={50}
            onPress={onClose}
            disabled={!soundLoaded}
          />
        </View>
        {!disablePointControls && soundLoaded && playState === 'paused' && (
          <>
            <View style={styles.previousButton}>
              <IconButton
                testID="previous-button"
                icon="skip-previous"
                size={50}
                onPress={onShowPrevious}
                disabled={isFirst || !soundLoaded}
              />
            </View>
            <View style={styles.nextButton}>
              <IconButton
                testID="next-button"
                icon="skip-next"
                size={50}
                onPress={onShowNext}
                disabled={isLast || !soundLoaded}
              />
            </View>
          </>
        )}
        <View style={styles.playButton}>
          {soundLoaded && playState === 'paused' && (
            <IconButton
              icon={'play'}
              size={50}
              onPress={clickPause}
              testID="play-button"
            />
          )}
          {!soundLoaded && (
            <ActivityIndicator
              testID="sound-loading"
              size={45}
              animating={true}
              style={styles.loadingSpinner}
            />
          )}
        </View>
        <View style={styles.controls}>
          <MediaSlider
            duration={duration}
            onSliderEditStart={onSliderEditStart}
            onSliderEditEnd={onSliderEditEnd}
            onSliderEditing={onSliderEditing}
            playSeconds={playSeconds}
          />
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const createStyles = ({width, height}) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'black',
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
      top: 20,
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
  disablePointControls: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  showPrevious: PropTypes.func.isRequired,
  showNext: PropTypes.func.isRequired,
  isLast: PropTypes.bool.isRequired,
  isFirst: PropTypes.bool.isRequired,
};
