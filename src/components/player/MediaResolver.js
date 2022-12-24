import React, {useMemo} from 'react';
import {View} from 'react-native';
import AudioPlayer from 'components/player/AudioPlayer';
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
  const mediaMap = useMemo(
    () => ({
      ['sound-collage']: (
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
      ),
    }),
    [close, disableControls, isFirst, isLast, point, showNext, showPrevious],
  );
  return mediaMap[point.contentType] || <View />;
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
