import {GDrive} from '@robinbobin/react-native-google-drive-api-wrapper';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {loginWithGoogleDrive} from 'services/google/googleLoginService';

const gDrive = new GDrive();

const setToken = async () => {
  const {accessToken} = await GoogleSignin.getTokens();
  gDrive.accessToken = accessToken;
};

const processTokenExpiredError = async e => {
  if (parseError(e)?.error?.code === 401 && (await GoogleSignin.isSignedIn())) {
    try {
      await loginWithGoogleDrive(true);
    } catch (error) {
      console.log(error);
    }
  }
};

const parseError = e => JSON.parse(JSON.parse(JSON.stringify(e)).message);

export const getDriveFiles = async mimeTypes => {
  const queryParam = mimeTypes?.map(type => `mimeType='${type}'`).join(' or ');
  await setToken();
  try {
    return await gDrive.files.list({
      q: queryParam,
      fields: 'nextPageToken, files(id, name, thumbnailLink, mimeType)',
    });
  } catch (e) {
    await processTokenExpiredError(e);
    throw e;
  }
};

export const getMetadata = async id => {
  await setToken();
  try {
    return await gDrive.files.getMetadata(id, {
      fields: 'permissionIds,imageMediaMetadata,description,name',
    });
  } catch (e) {
    await processTokenExpiredError(e);
    throw e;
  }
};

export const shareFile = async fileId => {
  await setToken();
  try {
    return await gDrive.permissions.create(fileId, undefined, {
      role: 'reader',
      type: 'anyone',
    });
  } catch (e) {
    await processTokenExpiredError(e);
    throw e;
  }
};

export const grantPermissions = async fileIds => {
  for (const [fileId] of fileIds) {
    const {role, type} = await shareFile(fileId);
    fileIds.set(fileId, role === 'reader' && type === 'anyone');
  }
};
