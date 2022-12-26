import store from 'store';
import {
  getFiles,
  getMetadataById,
  selectFiles,
  selectMetadata,
} from 'services/redux/googleDriveSlice';
import * as service from 'services/google/googleDriveService';
import googleDriveMimeTypes from 'utils/googleDriveMimeTypes';

const googleDriveData = {
  id1: {
    name: 'name1',
    permissionIds: ['permissionId1'],
  },
  id2: {
    name: 'name2',
    permissionIds: ['permissionId2'],
  },
  id3: {
    name: 'name3',
    permissionIds: ['permissionId3'],
  },
};

const fileData = [
  {
    id: 'id1',
    name: 'name1',
    thumbnailLink: 'link1',
  },
  {
    id: 'id2',
    name: 'name2',
    thumbnailLink: 'link2',
  },
  {
    id: 'id3',
    name: 'name3',
    thumbnailLink: 'link3',
  },
];

describe('google drive slice tests', () => {
  it('metadata selector', () => {
    const actual = selectMetadata.resultFunc({metadata: googleDriveData});
    expect(actual).toEqual(googleDriveData);
  });

  it('metadata initial and loading state', () => {
    const reduxStore = store();
    expect(reduxStore.getState().googleDrive.metadata).toStrictEqual({
      data: {},
      error: null,
      loading: false,
    });
    reduxStore.dispatch(getMetadataById(['id1', 'id2', 'id3']));
    expect(reduxStore.getState().googleDrive.metadata).toStrictEqual({
      data: {},
      error: null,
      loading: true,
    });
  });

  it('loaded metadata state', async () => {
    const reduxStore = store();
    const mockMetadata = jest
      .spyOn(service, 'getMetadata')
      .mockImplementation(id => googleDriveData[id]);
    await reduxStore.dispatch(getMetadataById(['id1', 'id2', 'id3']));
    expect(reduxStore.getState().googleDrive.metadata).toStrictEqual({
      data: googleDriveData,
      error: null,
      loading: false,
    });
    expect(mockMetadata).toHaveBeenCalledTimes(3);
  });

  it('reloaded cached metadata state', async () => {
    const reduxStore = store();
    const mockMetadata = jest
      .spyOn(service, 'getMetadata')
      .mockImplementation(id => googleDriveData[id]);
    await reduxStore.dispatch(getMetadataById(['id1', 'id2', 'id3']));
    expect(mockMetadata).toHaveBeenCalledTimes(3);
    await reduxStore.dispatch(getMetadataById(['id1', 'id2', 'id3']));
    expect(mockMetadata).toHaveBeenCalledTimes(3);
  });

  it('on error metadata state', async () => {
    const reduxStore = store();
    jest.spyOn(service, 'getMetadata').mockImplementation(() => {
      throw new Error('Rejected');
    });
    await reduxStore.dispatch(getMetadataById(['id1']));
    expect(reduxStore.getState().googleDrive.metadata).toStrictEqual({
      data: {},
      error: 'Rejected',
      loading: false,
    });
  });

  it('files selector', () => {
    const actual = selectFiles.resultFunc({files: fileData});
    expect(actual).toEqual(fileData);
  });

  it('files initial and loading state', () => {
    const reduxStore = store();
    expect(reduxStore.getState().googleDrive.files).toStrictEqual({
      data: [],
      error: null,
      loading: false,
    });
    reduxStore.dispatch(getFiles([googleDriveMimeTypes.IMAGE]));
    expect(reduxStore.getState().googleDrive.files).toStrictEqual({
      data: [],
      error: null,
      loading: true,
    });
  });

  it('loaded files state', async () => {
    const reduxStore = store();
    const mockMetadata = jest
      .spyOn(service, 'getDriveFiles')
      .mockImplementation(() => fileData);
    await reduxStore.dispatch(getFiles([googleDriveMimeTypes.IMAGE]));
    expect(reduxStore.getState().googleDrive.files).toStrictEqual({
      data: fileData,
      error: null,
      loading: false,
    });
    expect(mockMetadata).toHaveBeenCalledTimes(1);
  });

  it('on error files state', async () => {
    const reduxStore = store();
    jest.spyOn(service, 'getDriveFiles').mockImplementation(() => {
      throw new Error('Rejected');
    });
    await reduxStore.dispatch(getFiles([googleDriveMimeTypes.IMAGE]));
    expect(reduxStore.getState().googleDrive.files).toStrictEqual({
      data: [],
      error: {
        message: 'Rejected',
      },
      loading: false,
    });
  });
});
