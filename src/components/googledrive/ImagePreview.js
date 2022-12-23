import React, {useCallback} from 'react';
import {Surface, TouchableRipple} from 'react-native-paper';
import {Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const ImagePreview = ({file, onSelect}) => {
  const handleSelect = useCallback(() => {
    onSelect(file.id);
  }, [file.id, onSelect]);
  return (
    <Surface style={styles.card} elevation={1}>
      <TouchableRipple
        onPress={handleSelect}
        rippleColor="rgba(0, 0, 0, .32)"
        borderless>
        <Image source={{uri: file.thumbnailLink}} style={styles.image} />
      </TouchableRipple>
    </Surface>
  );
};

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
