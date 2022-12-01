import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getRoutes, selectRouteList} from 'services/redux/routeSlice';
import RouteCard from 'components/route/RouteCard';
import {useNavigate} from 'react-router-native';

const RoutesPage = () => {
  const [page] = useState({id: 0});
  const dispatch = useDispatch();
  const routes = useSelector(state => selectRouteList(state));
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getRoutes(page));
  }, [dispatch, page]);

  return (
    <>
      {routes.map(route => (
        <RouteCard
          key={route.id}
          route={route}
          onPlay={() => navigate(`/play/${route.id}`)}
        />
      ))}
    </>
  );
};

export default RoutesPage;
