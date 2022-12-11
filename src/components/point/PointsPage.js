import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {useSelector} from 'react-redux';
import {selectPointPage} from 'services/redux/pointSlice';
import {StyleSheet, View} from 'react-native';
import GoogleMapView from 'components/googlemaps/GoogleMapView';
import {GeoLocationContext} from 'GeoLocationProvider';
import {Banner, Button, Modal, Portal} from 'react-native-paper';
import MediaResolver from 'components/player/MediaResolver';
import {useNavigate, createSearchParams} from 'react-router-native';
import useNearbyPoint from 'components/point/useNearbyPoint';
import NewMarkers from 'components/custom/NewMarkers';
import PointViewPanel from 'components/point/PointViewPanel';
import {getDistance} from 'geolib';
import PointFilter from 'components/point/PointFilter';

const PointsPage = () => {
  const navigate = useNavigate();
  const points = useSelector(state => selectPointPage(state));
  const {position, enabled: gpsEnabled} = useContext(GeoLocationContext);
  const [playingPoint, setPlayingPoint] = useState(null);
  const [played, setPlayed] = useState([]);
  const [filterVisible, setFilterVisible] = useState(false);
  const [nearbyPoint, nearbyDistance, reached] = useNearbyPoint(
    points.list,
    position,
    gpsEnabled,
  );
  const [viewPoint, setViewPoint] = useState(null);
  const [mapDimension, setMapDimension] = useState({width: 300, height: 600});

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

  const onRadiusChanged = useCallback(
    value =>
      navigate({
        pathname: '/points',
        search: `?${createSearchParams({...points.page, radius: value})}`,
      }),
    [navigate, points.page],
  );

  const onSetViewPoint = useCallback(point => {
    setViewPoint(point);
  }, []);

  const onClearViewPoint = useCallback(() => {
    setViewPoint(null);
  }, []);

  const Markers = useMemo(
    () => <NewMarkers points={points.list} setPoint={onSetViewPoint} />,
    [onSetViewPoint, points],
  );

  const onSetFilterVisible = useCallback(() => {
    setFilterVisible(true);
  }, []);

  const onSetViewPlayingPoint = useCallback(
    point => setPlayingPoint(point),
    [],
  );

  const viewPointDistance = useMemo(() => {
    if (viewPoint) {
      const location = {
        latitude: viewPoint.location._latitude,
        longitude: viewPoint.location._longitude,
      };
      return getDistance(position, location);
    }
  }, [position, viewPoint]);

  const onHideFilter = useCallback(() => setFilterVisible(false), []);

  const findDimensions = useCallback(event => {
    const {width, height} = event.nativeEvent.layout;
    setMapDimension({width, height});
  }, []);

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
            onPress: onHideFilter,
          },
        ]}>
        <PointFilter
          radius={+points.page.radius}
          radiusChanged={onRadiusChanged}
        />
      </Banner>
      {!filterVisible && (
        <Button style={styles.moreButton} onPress={onSetFilterVisible}>
          ... More
        </Button>
      )}
      <View style={styles.container} onLayout={findDimensions}>
        <GoogleMapView children={Markers} />
      </View>
      {!viewPoint && nearbyPoint && (
        <PointViewPanel
          point={nearbyPoint}
          mapDimension={mapDimension}
          isNearby
          distance={nearbyDistance}
          clearPoint={onClearViewPoint}
          setPlayingPoint={onSetViewPlayingPoint}
        />
      )}
      {viewPoint && (
        <PointViewPanel
          mapDimension={mapDimension}
          point={viewPoint}
          isNearby={false}
          distance={viewPointDistance}
          clearPoint={onClearViewPoint}
          setPlayingPoint={onSetViewPlayingPoint}
        />
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
    position: 'absolute',
    top: 12,
    right: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    zIndex: 5000,
  },
  container: {
    marginTop: 0,
    flex: 1,
  },
});

export default PointsPage;
