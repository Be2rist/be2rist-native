import React, {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getRoutes, selectRouteList} from 'services/redux/routeSlice';
import RouteCard from 'components/route/RouteCard';
import {useNavigate} from 'react-router-native';

const RoutesPage = () => {
  const [page] = useState({id: 0});
  const dispatch = useDispatch();
  const routes = useSelector(selectRouteList);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getRoutes(page));
  }, [dispatch, page]);

  const handlePlay = useCallback(
    id => () => {
      navigate(`/play/${id}`);
    },
    [navigate],
  );

  return (
    <>
      {routes.map(route => (
        <RouteCard key={route.id} route={route} onPlay={handlePlay(route.id)} />
      ))}
    </>
  );
};

export default RoutesPage;
