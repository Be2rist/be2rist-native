import React, {useCallback, useState} from 'react';
import {
  Appbar,
  Button,
  Card,
  Modal,
  Paragraph,
  Portal,
} from 'react-native-paper';
import {googleMapStatic, imageLink} from 'utils/googleLinks';
import {useSelector} from 'react-redux';
import {selectPoint} from 'services/redux/pointSlice';
import MediaResolver from 'components/player/MediaResolver';
import {StyleSheet} from 'react-native';
import BackgroundScrollView from 'components/custom/BackgroundScrollView';
import Preloader from 'components/root/Preloader';
import {useTranslation} from 'react-i18next';
import {useNavigate} from 'react-router-native';

const PointViewPage = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const {data: point, loading} = useSelector(selectPoint);
  const [playingPoint, setPlayingPoint] = useState(null);

  const editPoint = useCallback(() => {
    navigate(`/point/${point.id}`);
  }, [navigate, point]);

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onSetPlayingPoint = useCallback(() => {
    setPlayingPoint(point);
  }, [point, setPlayingPoint]);

  const onClosePlayer = useCallback(() => {
    setPlayingPoint(null);
  }, []);

  return (
    <>
      <Portal>
        <Modal
          visible={!!playingPoint}
          onDismiss={onClosePlayer}
          contentContainerStyle={styles.modal}>
          {playingPoint && (
            <MediaResolver point={playingPoint} close={onClosePlayer} />
          )}
        </Modal>
      </Portal>
      <BackgroundScrollView>
        <Appbar.Header>
          <Appbar.BackAction onPress={goBack} />
          <Appbar.Content title={t('point.edit.title')} />
        </Appbar.Header>
        <Preloader loading={loading}>
          <Card>
            <Card.Title title={point.name} />
            {point.cover && (
              <Card.Cover source={{uri: imageLink(point.cover)}} />
            )}
            <Card.Actions>
              <Button icon="image-edit" mode="outlined" onPress={editPoint}>
                {t('edit')}
              </Button>
              <Button
                icon="play-box-outline"
                mode="contained"
                onPress={onSetPlayingPoint}>
                {t('play')}
              </Button>
            </Card.Actions>
            {point.location && (
              <Card.Cover
                style={styles.googleMap}
                source={{
                  uri: googleMapStatic({location: point.location}),
                }}
              />
            )}
            <Card.Content>
              <Paragraph>{point.description}</Paragraph>
            </Card.Content>
          </Card>
        </Preloader>
      </BackgroundScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    marginTop: -20,
    flex: 1,
  },
  googleMap: {
    marginTop: 10,
  },
});

export default PointViewPage;
