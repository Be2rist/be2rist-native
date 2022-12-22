import React, {useContext, useEffect, useMemo} from 'react';
import * as PropTypes from 'prop-types';
import {Navigate, useLocation, useParams} from 'react-router-native';
import {selectUser} from 'services/redux/userSlice';
import {useDispatch, useSelector} from 'react-redux';
import {parse} from 'query-string';
import {SettingsContext} from 'SettingsProvider';

const ProtectedActionRoute = ({route}) => {
  const {search} = useLocation();
  const {
    settings: {language},
  } = useContext(SettingsContext);
  const pathParams = useParams();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const allowed = useMemo(() => user || route.unAuthenticated, [user, route]);
  useEffect(() => {
    allowed &&
      route.actions &&
      route.actions.forEach(action =>
        dispatch(action({...pathParams, ...parse(search), language})),
      );
  }, [route, pathParams, dispatch, allowed, search, language]);
  return allowed ? route.element : <Navigate to="/login" />;
};

ProtectedActionRoute.propTypes = {
  route: PropTypes.object.isRequired,
};

export default ProtectedActionRoute;
