import AudioPlayer from 'components/player/AudioPlayer';
import {View} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const MediaResolver = ({
  point,
  close,
  disableControls,
  showNext,
  showPrevious,
  isFirst,
  isLast,
}) => {
  switch (point.contentType) {
    case 'sound-collage':
      return (
        <AudioPlayer
          key={point.id}
          point={point}
          close={close}
          disablePointControls={disableControls}
          showNext={showNext}
          showPrevious={showPrevious}
          isFirst={disableControls || isFirst}
          isLast={disableControls || isLast}
        />
      );
    default:
      return <View />;
  }
};

export default MediaResolver;

MediaResolver.propTypes = {
  point: PropTypes.object.isRequired,
  close: PropTypes.func.isRequired,
  showNext: PropTypes.func,
  showPrevious: PropTypes.func,
  disableControls: PropTypes.bool,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
};

MediaResolver.defaultProps = {
  showNext: () => {},
  showPrevious: () => {},
  disableControls: true,
  isFirst: true,
  isLast: true,
};
