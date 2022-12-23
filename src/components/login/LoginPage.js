import React, {useCallback, useContext, useState} from 'react';
import {Navigate, useNavigate} from 'react-router-native';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser} from 'services/redux/userSlice';
import auth from '@react-native-firebase/auth';
import {GoogleSigninButton} from '@react-native-google-signin/google-signin';
import {SafeAreaView, StatusBar, StyleSheet, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {SettingsContext} from 'SettingsProvider';
import {Appbar} from 'react-native-paper';
import {useTranslation} from 'react-i18next';
import {showNotificationMessage} from 'services/redux/notificationMessageSlice';
import {loginWithGoogleDrive} from 'services/google/googleLoginService';

const style = StyleSheet.create({
  googleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

const LoginPage = () => {
  const user = useSelector(selectUser);
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
    try {
      const {idToken} = await loginWithGoogleDrive();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      auth()
        .signInWithCredential(googleCredential)
        .catch(e => {
          console.log(e);
          dispatch(showNotificationMessage({message: t('error.tryLater')}));
        })
        .finally(() => setProcessing(false));
    } catch (e) {
      console.log(e);
      dispatch(showNotificationMessage({message: t('error.tryLater')}));
    }
  };

  const goBack = useCallback(() => {
    navigate('/');
  }, [navigate]);

  return (
    <>
      {!user ? (
        <SafeAreaView style={backgroundStyle}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <Appbar.Header>
            <Appbar.BackAction onPress={goBack} />
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
