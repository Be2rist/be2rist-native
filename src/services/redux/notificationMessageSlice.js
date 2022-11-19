import {createSelector, createSlice} from '@reduxjs/toolkit';

const initialState = {
  notificationMessage: {},
};

const notificationMessageSlice = createSlice({
  name: 'notificationMessage',
  initialState,
  reducers: {
    showNotificationMessage(state, action) {
      state.notificationMessage = action.payload;
    },
    hideNotificationMessage(state) {
      state.notificationMessage = {};
    },
  },
});

const selectSelf = state => state.notificationMessage;

export const selectNotificationMessage = createSelector(
  selectSelf,
  state => state.notificationMessage,
);

export const {showNotificationMessage, hideNotificationMessage} =
  notificationMessageSlice.actions;

export default notificationMessageSlice.reducer;
