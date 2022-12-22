import {
  createAsyncThunk,
  createSelector,
  createSlice,
  current,
} from '@reduxjs/toolkit';
import {getDriveFiles, getMetadata} from 'services/google/googleDriveService';

const initialState = {
  metadata: {
    data: {},
    loading: false,
    error: null,
  },
  files: {
    data: [],
    loading: false,
    error: null,
  },
};

export const getMetadataById = createAsyncThunk(
  'point/getMetadataById',
  async (ids, {rejectWithValue, getState}) => {
    try {
      const data = getState().googleDrive.metadata.data;
      const files = {};
      for (const id of ids) {
        files[id] = data.id ? {data: data.id} : await getMetadata(id);
      }
      return files;
    } catch (err) {
      return rejectWithValue(err.response);
    }
  },
);

export const getFiles = createAsyncThunk(
  'point/getFiles',
  async (request, {rejectWithValue}) => {
    try {
      return await getDriveFiles(request);
    } catch (err) {
      return rejectWithValue(err.response);
    }
  },
);

const googleDriveSlice = createSlice({
  name: 'googleDrive',
  initialState,
  extraReducers: builder => {
    builder.addCase(getMetadataById.pending, state => {
      state.metadata.loading = true;
      state.metadata.error = null;
    });
    builder.addCase(getMetadataById.fulfilled, (state, action) => {
      state.metadata.loading = false;
      state.metadata.data = {
        ...current(state).metadata.data,
        ...action.payload,
      };
    });
    builder.addCase(getMetadataById.rejected, (state, action) => {
      state.metadata.loading = false;
      state.metadata.error = action.error?.message || 'unknown';
    });
    builder.addCase(getFiles.pending, state => {
      state.files.loading = true;
      state.files.data = [];
      state.files.error = null;
    });
    builder.addCase(getFiles.fulfilled, (state, action) => {
      state.files.loading = false;
      state.files.data = action.payload;
    });
    builder.addCase(getFiles.rejected, (state, action) => {
      state.files.loading = false;
      state.files.error = action.error || 'unknown';
    });
  },
});

const selectSelf = state => state.googleDrive;

export const selectMetadata = createSelector(
  selectSelf,
  state => state.metadata,
);

export const selectFiles = createSelector(selectSelf, state => state.files);

export default googleDriveSlice.reducer;
