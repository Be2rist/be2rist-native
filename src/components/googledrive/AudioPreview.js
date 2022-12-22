import React from 'react';
import {Surface, Text, TouchableRipple} from 'react-native-paper';
import {Image, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import {AUDIO} from 'images';

const AudioPreview = ({file, onSelect}) => (
  <Surface style={styles.card} elevation={1}>
    <View style={styles.name}>
      <Text>{file.name}</Text>
    </View>
    <TouchableRipple
      onPress={onSelect.bind(this, file.id)}
      rippleColor="rgba(0, 0, 0, .32)"
      borderless
      style={styles.imageContainer}>
      <View>
        <Image style={styles.image} source={AUDIO} />
      </View>
    </TouchableRipple>
  </Surface>
);

const styles = StyleSheet.create({
  card: {
    margin: 5,
    height: 170,
    flexBasis: '46%',
  },
  name: {
    position: 'absolute',
    bottom: 10,
    marginLeft: 10,
    marginRight: 10,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -10,
  },
  image: {
    width: 50,
    height: 50,
  },
});

export default AudioPreview;

AudioPreview.propTypes = {
  file: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  onSelect: PropTypes.func.isRequired,
};
