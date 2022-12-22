import React, {useEffect} from 'react';
import Preloader from 'components/root/Preloader';
import {getFiles, selectFiles} from 'services/redux/googleDriveSlice';
import {useDispatch, useSelector} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import MediaContentResolver from 'components/googledrive/MediaContentResolver';

const GoogleDriveView = ({imageTypes, onSelect}) => {
  const files = useSelector(selectFiles);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFiles(imageTypes));
  }, [dispatch, imageTypes]);

  return (
    <Preloader loading={files.loading}>
      <View style={styles.content}>
        {files.data.files?.map(file => (
          <MediaContentResolver key={file.id} file={file} onSelect={onSelect} />
        ))}
      </View>
    </Preloader>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default GoogleDriveView;

GoogleDriveView.propTypes = {
  onSelect: PropTypes.func.isRequired,
  imageTypes: PropTypes.array.isRequired,
};
