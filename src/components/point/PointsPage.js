import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {useSelector} from 'react-redux';
import {selectPointPage} from 'services/redux/pointSlice';
import {Platform, Slider, StyleSheet, View} from 'react-native';
import GoogleMapView from 'components/googlemaps/GoogleMapView';
import {GeoLocationContext} from 'GeoLocationProvider';
import {
  Banner,
  Button,
  Card,
  IconButton,
  Avatar,
  Modal,
  Portal,
  Text,
} from 'react-native-paper';
import MediaResolver from 'components/player/MediaResolver';
import {useNavigate, createSearchParams} from 'react-router-native';
import useNearbyPoint from 'components/point/useNearbyPoint';
import NewMarkers from 'components/custom/NewMarkers';

const MapMarker = props => <Avatar.Icon {...props} icon="map-marker" />;

const PlayButton = (props, onPress) => (
  <IconButton {...props} icon="play-box-outline" onPress={onPress} />
);

const PointsPage = () => {
  const navigate = useNavigate();
  const points = useSelector(state => selectPointPage(state));
  const {position, enabled: gpsEnabled} = useContext(GeoLocationContext);
  const [playingPoint, setPlayingPoint] = useState(null);
  const [played, setPlayed] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [nearbyPoint, distance, reached] = useNearbyPoint(
    points.list,
    position,
    gpsEnabled,
  );

  useEffect(() => {
    nearbyPoint &&
      reached &&
      playingPoint?.id !== nearbyPoint.id &&
      !played.includes(nearbyPoint.id) &&
      setPlayingPoint(nearbyPoint);
  }, [nearbyPoint, played, playingPoint, reached]);

  const onClose = useCallback(() => {
    setPlayed([...played, playingPoint.id]);
    setPlayingPoint(null);
  }, [played, playingPoint]);

  const onValueChanged = useCallback(
    value =>
      navigate({
        pathname: '/points',
        search: `?${createSearchParams({...points.page, radius: value})}`,
      }),
    [navigate, points.page],
  );

  const onSetPlayingPoint = useCallback(point => {
    setPlayingPoint(point);
  }, []);

  const Markers = useMemo(
    () => (
      <NewMarkers points={points.list} setPlayingPoint={onSetPlayingPoint} />
    ),
    [onSetPlayingPoint, points],
  );

  const onSetFilterVisible = () => setFilterVisible(true);

  const onSetNearbyPlayingPoint = point => () => setPlayingPoint(point);

  return (
    <>
      <Portal>
        <Modal
          visible={!!playingPoint}
          onDismiss={onClose}
          contentContainerStyle={styles.modal}>
          {playingPoint && (
            <MediaResolver point={playingPoint} close={onClose} />
          )}
        </Modal>
      </Portal>
      <Banner
        visible={filterVisible}
        actions={[
          {
            label: 'Close',
            onPress: () => setFilterVisible(false),
          },
        ]}>
        <View style={styles.radius}>
          <IconButton icon="map-marker-radius" />
          <Slider
            onSlidingComplete={onValueChanged}
            value={+points.page.radius}
            minimumValue={0}
            maximumValue={25}
            step={0.1}
            maximumTrackTintColor="gray"
            minimumTrackTintColor={'white'}
            thumbTintColor={'white'}
            style={styles.slider}
          />
          <Text variant="titleMedium">{(+points.page.radius).toFixed(1)}</Text>
        </View>
      </Banner>
      {!filterVisible && (
        <View style={styles.moreButton}>
          <Button onPress={onSetFilterVisible}>... More</Button>
        </View>
      )}
      <View style={styles.container}>
        <GoogleMapView children={Markers} />
      </View>
      {nearbyPoint && (
        <Card>
          <Card.Title
            title={nearbyPoint.name}
            subtitle={`${distance} m`}
            left={MapMarker}
            right={props =>
              PlayButton(props, onSetNearbyPlayingPoint(nearbyPoint))
            }
          />
        </Card>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    marginTop: -20,
    flex: 1,
  },
  moreButton: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  container: {
    marginTop: 10,
    height: 400,
  },
  radius: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    width: 300,
    height: 30,
    borderRadius: 50,
    flex: 1,
    alignSelf: 'center',
    marginHorizontal: Platform.select({ios: 5}),
  },
});

export default PointsPage;
