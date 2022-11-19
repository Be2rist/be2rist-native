import {configureStore} from '@reduxjs/toolkit';
import notificationMessageReducer from 'services/redux/notificationMessageSlice';
import userReducer from 'services/redux/userSlice';
import routeReducer from 'services/redux/routeSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    route: routeReducer,
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
