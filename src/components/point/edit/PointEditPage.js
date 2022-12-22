import React, {useCallback} from 'react';
import {useNavigate} from 'react-router-native';
import {useTranslation} from 'react-i18next';
import {Appbar} from 'react-native-paper';
import BackgroundScrollView from 'components/custom/BackgroundScrollView';
import {useSelector} from 'react-redux';
import {selectPoint} from 'services/redux/pointSlice';
import Preloader from 'components/root/Preloader';
import PointForm from 'components/point/edit/PointForm';
import {grantPermissions} from 'services/google/googleDriveService';

const PointEditPage = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const point = useSelector(selectPoint);

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onSubmit = useCallback(async values => {
    console.log(values);
    const permissions = new Map([
      [values.cover, false],
      [values.audioContent, false],
      ...values.images.map(image => [image.image, false]),
    ]);
    await grantPermissions(permissions);
  }, []);

  return (
    <BackgroundScrollView>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={t('point.edit.title')} />
      </Appbar.Header>
      <Preloader loading={point.loading}>
        <PointForm point={point.data} onSubmit={onSubmit} />
      </Preloader>
    </BackgroundScrollView>
  );
};

export default PointEditPage;
