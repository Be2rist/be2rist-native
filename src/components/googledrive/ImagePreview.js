import React from 'react';
import {Surface, TouchableRipple} from 'react-native-paper';
import {Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const ImagePreview = ({file, onSelect}) => (
  <Surface style={styles.card} elevation={1}>
    <TouchableRipple
      onPress={onSelect.bind(this, file.id)}
      rippleColor="rgba(0, 0, 0, .32)"
      borderless>
      <Image source={{uri: file.thumbnailLink}} style={styles.image} />
    </TouchableRipple>
  </Surface>
);

const styles = StyleSheet.create({
  card: {
    margin: 5,
    flexBasis: '46%',
  },
  image: {
    flex: 1,
    height: 170,
  },
});

export default ImagePreview;

ImagePreview.propTypes = {
  file: PropTypes.shape({
    id: PropTypes.string.isRequired,
    thumbnailLink: PropTypes.string.isRequired,
  }),
  onSelect: PropTypes.func.isRequired,
};
