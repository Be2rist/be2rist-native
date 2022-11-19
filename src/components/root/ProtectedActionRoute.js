import React, {useEffect, useMemo} from 'react';
import * as PropTypes from 'prop-types';
import {Navigate, useParams} from 'react-router-native';
import {selectUser} from 'services/redux/userSlice';
import {useDispatch, useSelector} from 'react-redux';

const ProtectedActionRoute = ({route}) => {
  const pathParams = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => selectUser(state));
  const allowed = useMemo(() => user || route.unAuthenticated, [user, route]);
  useEffect(() => {
    if (allowed && route.actions) {
      route.actions.forEach(action => dispatch(action(pathParams)));
    }
    return undefined;
  }, [route, pathParams, dispatch, allowed]);
  return allowed ? route.element : <Navigate to="/login" />;
};

ProtectedActionRoute.propTypes = {
  route: PropTypes.object.isRequired,
};

export default ProtectedActionRoute;
