import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {
  hideNotificationMessage,
  selectNotificationMessage,
} from 'services/redux/notificationMessageSlice';

const NotificationMessageProvider = ({children}) => {
  const {message} = useSelector(state => selectNotificationMessage(state));
  const dispatch = useDispatch();
  const onClose = () => dispatch(hideNotificationMessage());
  return (
    <View style={styles.container}>
      <Snackbar
        style={styles.snackbar}
        onDismiss={onClose}
        visible={!!message}
        action={{
          label: 'Undo',
        }}>
        {message}
      </Snackbar>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  snackbar: {
    zIndex: 10000,
    bottom: 80,
  },
});

export default NotificationMessageProvider;
