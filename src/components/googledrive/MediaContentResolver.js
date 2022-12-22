import React from 'react';
import googleDriveMimeTypes from 'utils/googleDriveMimeTypes';
import ImagePreview from 'components/googledrive/ImagePreview';
import AudioPreview from 'components/googledrive/AudioPreview';
import PropTypes from 'prop-types';

const MediaContentResolver = ({file, onSelect}) => {
  switch (file.mimeType) {
    case googleDriveMimeTypes.IMAGE:
      return <ImagePreview file={file} onSelect={onSelect} />;
    case googleDriveMimeTypes.AUDIO:
      return <AudioPreview file={file} onSelect={onSelect} />;
    default:
      return <></>;
  }
};

export default MediaContentResolver;

MediaContentResolver.propTypes = {
  onSelect: PropTypes.func.isRequired,
  file: PropTypes.shape({
    mimeType: PropTypes.string.isRequired,
  }).isRequired,
};
