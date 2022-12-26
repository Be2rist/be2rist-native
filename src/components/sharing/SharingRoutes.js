import React, {useCallback} from 'react';
import Preloader from 'components/root/Preloader';
import {useSelector} from 'react-redux';
import {selectRouteList} from 'services/redux/routeSlice';
import RouteCard from 'components/route/RouteCard';

const SharingRoutes = () => {
  const routes = useSelector(selectRouteList);

  const navigateRouteEdit = useCallback(() => {}, []);
  return (
    <Preloader loading={routes.loading}>
      {routes.list.map(route => (
        <RouteCard key={route.id} route={route} onPlay={navigateRouteEdit} />
      ))}
    </Preloader>
  );
};

export default SharingRoutes;
