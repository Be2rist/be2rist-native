import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {config} from 'configs';

export const loginWithGoogleDrive = async silent => {
  GoogleSignin.configure({
    scopes: ['https://www.googleapis.com/auth/drive'],
    webClientId: config.CLIENT_ID,
    offlineAccess: true,
    forceCodeForRefreshToken: true,
  });
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  return silent
    ? await GoogleSignin.signInSilently()
    : await GoogleSignin.signIn();
};

export const login = async () => {
  GoogleSignin.configure({
    webClientId: config.CLIENT_ID,
    offlineAccess: true,
    forceCodeForRefreshToken: true,
  });
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  return await GoogleSignin.signIn();
};
