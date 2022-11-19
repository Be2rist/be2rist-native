import React, {useEffect, useState} from 'react';
import * as PropTypes from 'prop-types';
import {Card, IconButton, MD3Colors} from 'react-native-paper';
import Sound from 'react-native-sound';
import {Image} from 'react-native';

const AudioPlayer = ({point, close}) => {
  const [sound, setSound] = useState(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!sound) {
      const loadSound = new Sound(point.audioContent, null, error => {
        if (error) {
          // do something
        } else {
          loadSound.play();
        }
      });
      setSound(loadSound);
    } else {
      sound.play();
    }
    return releaseOnCloseSound();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [point]);

  const releaseOnCloseSound = () => {
    if (sound) {
      sound.release();
    }
  };

  const releaseSound = () => {
    if (sound) {
      sound.stop();
    }
  };

  const onPause = () => {
    if (sound) {
      sound.pause();
    }
    setPaused(true);
  };

  const onPlay = () => {
    if (sound) {
      sound.play(playComplete);
    }
    setPaused(false);
  };

  const onClose = () => {
    releaseSound();
    close();
  };

  const playComplete = success => {
    if (sound) {
      if (success) {
        console.log('successfully finished playing');
      } else {
        console.log('playback failed due to audio decoding errors');
      }
    }
  };

  return (
    <Card>
      <Card.Actions>
        <IconButton
          icon="heart-outline"
          iconColor={MD3Colors.primary0}
          size={20}
          onPress={onClose}
        />
        <IconButton
          icon="play"
          iconColor={MD3Colors.error50}
          size={20}
          onPress={() => (paused ? onPlay() : onPause())}
        />
      </Card.Actions>
      <Image source={{uri: point.images[0].image}} />
    </Card>
  );
};

export default React.memo(AudioPlayer);

AudioPlayer.propTypes = {
  point: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
};
