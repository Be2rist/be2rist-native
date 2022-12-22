import React from 'react';
import {Appbar, Modal, Portal} from 'react-native-paper';
import {StyleSheet} from 'react-native';
import GoogleDriveView from 'components/googledrive/GoogleDriveView';
import BackgroundScrollView from 'components/custom/BackgroundScrollView';
import PropTypes from 'prop-types';

const GoogleDriveModal = ({visible, imageTypes, onClose, onSelect}) => (
  <Portal>
    <Modal
      visible={visible}
      onDismiss={onClose}
      contentContainerStyle={styles.modal}>
      <BackgroundScrollView>
        <Appbar.Header>
          <Appbar.BackAction onPress={onClose} />
          <Appbar.Content title="Google Drive" />
        </Appbar.Header>
        <GoogleDriveView onSelect={onSelect} imageTypes={imageTypes} />
      </BackgroundScrollView>
    </Modal>
  </Portal>
);

const styles = StyleSheet.create({
  modal: {
    flex: 1,
  },
});

export default GoogleDriveModal;

GoogleDriveModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  imageTypes: PropTypes.array.isRequired,
  onClose: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};
