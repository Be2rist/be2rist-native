import {GDrive} from '@robinbobin/react-native-google-drive-api-wrapper';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const gDrive = () => new GDrive();

const createDrive = async () => {
  const {accessToken} = await GoogleSignin.getTokens();
  const drive = gDrive();
  drive.accessToken = accessToken;
  return drive;
};

const processTokenExpiredError = async (e, token) => {
  if (parseError(e)?.error?.code === 401 && (await GoogleSignin.isSignedIn())) {
    try {
      await GoogleSignin.clearCachedAccessToken(token);
    } catch (error) {
      console.log(error);
    }
  }
};

const parseError = e => JSON.parse(JSON.parse(JSON.stringify(e)).message);

export const getDriveFiles = async mimeTypes => {
  const queryParam = mimeTypes?.map(type => `mimeType='${type}'`).join(' or ');
  const drive = await createDrive();
  try {
    return await drive.files.list({
      q: queryParam,
      fields: 'nextPageToken, files(id, name, thumbnailLink, mimeType)',
    });
  } catch (e) {
    await processTokenExpiredError(e, drive.accessToken);
    throw e;
  }
};

export const getMetadata = async id => {
  const drive = await createDrive();
  try {
    return await drive.files.getMetadata(id, {
      fields: 'permissionIds,imageMediaMetadata,description,name',
    });
  } catch (e) {
    await processTokenExpiredError(e, drive.accessToken);
    throw e;
  }
};

export const shareFile = async fileId => {
  const drive = await createDrive();
  try {
    return await drive.permissions.create(fileId, undefined, {
      role: 'reader',
      type: 'anyone',
    });
  } catch (e) {
    await processTokenExpiredError(e, drive.accessToken);
    throw e;
  }
};

export const grantPermissions = async fileIds => {
  for (const [fileId] of fileIds) {
    const {role, type} = await shareFile(fileId);
    fileIds.set(fileId, role === 'reader' && type === 'anyone');
  }
};
