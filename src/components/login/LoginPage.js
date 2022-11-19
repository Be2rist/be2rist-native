import React, {useContext, useState} from 'react';
import {Navigate, useNavigate} from 'react-router-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser} from 'services/redux/userSlice';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {SettingsContext} from 'SettingsProvider';
import {Appbar} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {showNotificationMessage} from 'services/redux/notificationMessageSlice';

GoogleSignin.configure({
  webClientId:
    '594877017389-kqm5s26uomltisiuvmqfvvditqeqn0cs.apps.googleusercontent.com',
});

const style = StyleSheet.create({
  googleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

const LoginPage = () => {
  const user = useSelector(state => selectUser(state));
  const navigate = useNavigate();
  const {t} = useTranslation();
  const [processing, setProcessing] = useState(false);
  const dispatch = useDispatch();

  const {
    settings: {theme},
  } = useContext(SettingsContext);
  const isDarkMode = theme === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  const onGoogleButtonPress = async () => {
    setProcessing(true);
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    auth()
      .signInWithCredential(googleCredential)
      .catch(() =>
        dispatch(showNotificationMessage({message: t('error.tryLater')})),
      )
      .finally(() => setProcessing(false));
  };

  return (
    <>
      {!user ? (
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <Appbar.Header>
            <Appbar.BackAction onPress={() => navigate('/')} />
            <Appbar.Content title={t('login')} />
          </Appbar.Header>
          <View style={style.googleContainer}>
            <GoogleSigninButton
              size={GoogleSigninButton.Size.Wide}
              onPress={onGoogleButtonPress}
              disabled={processing}
            />
          </View>
        </SafeAreaView>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default LoginPage;
