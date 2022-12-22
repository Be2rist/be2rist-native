import React from 'react';
import {StyleSheet} from 'react-native';
import {Button, Card, Dialog, Paragraph, Portal} from 'react-native-paper';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import {googleMapStatic} from 'utils/googleLinks';

const LocationConfirmationDialog = ({
  visible,
  close,
  setLocation,
  location,
}) => {
  const {t} = useTranslation();
  return (
    <Portal>
      <Dialog
        visible={visible && location.latitude && location.longitude}
        onDismiss={close}>
        <Dialog.Title style={styles.title}>GPS</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{t('point.edit.gps.dialog.containsLocation')}</Paragraph>
          <Card>
            <Card.Cover
              source={{
                uri: googleMapStatic({location}),
              }}
            />
          </Card>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={close}>{t('cancel')}</Button>
          <Button onPress={setLocation}>{t('ok')}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
});

export default LocationConfirmationDialog;

LocationConfirmationDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  setLocation: PropTypes.func.isRequired,
  location: PropTypes.object,
};

LocationConfirmationDialog.defaultProps = {
  location: {},
};
