import React, {useEffect, useMemo} from 'react';
import * as PropTypes from 'prop-types';
import {Navigate, useLocation, useParams} from 'react-router-native';
import {selectUser} from 'services/redux/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {parse} from 'query-string';

const ProtectedActionRoute = ({route}) => {
  const location = useLocation();
  const pathParams = useParams();
  const dispatch = useDispatch();
  const user = useSelector(state => selectUser(state));
  const allowed = useMemo(() => user || route.unAuthenticated, [user, route]);
  useEffect(() => {
    allowed &&
      route.actions &&
      route.actions.forEach(action =>
        dispatch(action({...pathParams, ...parse(location.search)})),
      );
  }, [route, pathParams, dispatch, allowed, location.search]);
  return allowed ? route.element : <Navigate to="/login" />;
};

ProtectedActionRoute.propTypes = {
  route: PropTypes.object.isRequired,
};

export default ProtectedActionRoute;
