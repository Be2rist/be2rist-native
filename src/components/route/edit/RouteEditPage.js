import React, {useCallback} from 'react';
import {useNavigate} from 'react-router-native';
import {useTranslation} from 'react-i18next';
import {Appbar} from 'react-native-paper';
import BackgroundScrollView from 'components/custom/BackgroundScrollView';
import {useSelector} from 'react-redux';
import Preloader from 'components/root/Preloader';
import {grantPermissions} from 'services/google/googleDriveService';
import {selectRoute} from 'services/redux/routeSlice';
import RouteForm from 'components/route/edit/RouteForm';

const RouteEditPage = () => {
  const navigate = useNavigate();
  const {t} = useTranslation();
  const route = useSelector(selectRoute);

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  const onSubmit = useCallback(async values => {
    console.log(values);
    const permissions = new Map([[values.cover, false]]);
    await grantPermissions(permissions);
  }, []);

  return (
    <BackgroundScrollView>
      <Appbar.Header>
        <Appbar.BackAction onPress={goBack} />
        <Appbar.Content title={t('route.edit.title')} />
      </Appbar.Header>
      <Preloader loading={route.loading}>
        <RouteForm route={route.data} onSubmit={onSubmit} />
      </Preloader>
    </BackgroundScrollView>
  );
};

export default RouteEditPage;
