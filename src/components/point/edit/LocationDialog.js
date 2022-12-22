import React, {useCallback, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Dialog, Portal} from 'react-native-paper';
import PropTypes from 'prop-types';
import {useTranslation} from 'react-i18next';
import GoogleMapView from 'components/googlemaps/GoogleMapView';
import {Marker} from 'react-native-maps';

const LocationDialog = ({visible, close, setLocation, location}) => {
  const {t} = useTranslation();
  const [draggableLocation, setDraggableLocation] = useState(location);

  const onSetDraggableLocation = useCallback(e => {
    setDraggableLocation(e.nativeEvent.coordinate);
  }, []);

  const onSetLocation = useCallback(() => {
    setLocation(draggableLocation);
  }, [draggableLocation, setLocation]);

  const PositionMarker = useMemo(
    () => (
      <Marker
        draggable
        coordinate={location}
        onDragEnd={onSetDraggableLocation}
      />
    ),
    [location, onSetDraggableLocation],
  );

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={close}>
        <Dialog.Title style={styles.title}>GPS</Dialog.Title>
        <Dialog.Content>
          <View style={styles.container}>
            {location.latitude && location.longitude && (
              <GoogleMapView
                initialRegion={location}
                children={PositionMarker}
                showsUserLocation={false}
              />
            )}
          </View>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={close}>{t('cancel')}</Button>
          <Button onPress={onSetLocation}>{t('ok')}</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
  container: {
    height: 300,
  },
});

export default LocationDialog;

LocationDialog.propTypes = {
  visible: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  setLocation: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};
