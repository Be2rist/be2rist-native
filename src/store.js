import {configureStore} from '@reduxjs/toolkit';
import notificationMessageReducer from 'services/redux/notificationMessageSlice';
import userReducer from 'services/redux/userSlice';
import routeReducer from 'services/redux/routeSlice';
import pointReducer from 'services/redux/pointSlice';
import googleDriveReducer from 'services/redux/googleDriveSlice';

const store = () =>
  configureStore({
    reducer: {
      user: userReducer,
      route: routeReducer,
      point: pointReducer,
      googleDrive: googleDriveReducer,
      notificationMessage: notificationMessageReducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: ['user/userChanged'],
        },
      }),
  });

export default store;
