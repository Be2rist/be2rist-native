import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import functions from '@react-native-firebase/functions';
import {isEmpty} from 'utils/objectUtils';
import {GeolocationFlow} from 'GeoLocationProvider';

const initialState = {
  pointPage: {
    list: [],
    loading: false,
    error: null,
    page: {
      radius: 5,
    },
  },
  pointList: {
    list: [],
    loading: false,
    error: null,
  },
  point: {
    data: {
      language: 'pl',
      contentType: 'sound-collage',
      radius: 20,
    },
    loading: false,
    error: null,
  },
};

export const getNearbyPoints = createAsyncThunk(
  'point/getAllNearby',
  async (request, {rejectWithValue, getState}) => {
    try {
      const {language} = request;
      delete request.language;
      const params = isEmpty(request)
        ? {...getState().point.pointPage.page, languages: [language]}
        : request;
      const response = await functions().httpsCallable('point-getAllNearby')({
        ...params,
        location: GeolocationFlow.location,
      });
      return {data: response.data, params};
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const getUserPoints = createAsyncThunk(
  'point/getAllByUser',
  async (request, {rejectWithValue}) => {
    try {
      const response = await functions().httpsCallable('point-getAllByUser')();
      return {data: response.data};
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const getPointById = createAsyncThunk(
  'point/getById',
  async (request, {rejectWithValue}) => {
    try {
      const response = await functions().httpsCallable('point-getById')(
        request,
      );
      return {data: response.data};
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const initPoint = createAsyncThunk('point/init', () => {
  return initialState.point;
});

const pointSlice = createSlice({
  name: 'point',
  initialState,
  extraReducers: builder => {
    builder.addCase(getNearbyPoints.pending, state => {
      state.pointPage.loading = true;
      state.pointList.error = null;
    });
    builder.addCase(getNearbyPoints.fulfilled, (state, action) => {
      state.pointPage.loading = false;
      state.pointPage.list = action.payload.data;
      state.pointPage.page = action.payload.params;
    });
    builder.addCase(getNearbyPoints.rejected, (state, action) => {
      state.pointPage.loading = false;
      state.pointPage.error = action.error?.message || 'unknown';
    });
    builder.addCase(getUserPoints.pending, state => {
      state.pointList.loading = true;
      state.pointList.error = null;
    });
    builder.addCase(getUserPoints.fulfilled, (state, action) => {
      state.pointList.loading = false;
      state.pointList.list = action.payload.data;
    });
    builder.addCase(getUserPoints.rejected, (state, action) => {
      state.pointList.loading = false;
      state.pointList.error = action.error?.message || 'unknown';
    });
    builder.addCase(getPointById.pending, state => {
      state.point.loading = true;
      state.point.data = initialState.point.data;
      state.point.error = null;
    });
    builder.addCase(getPointById.fulfilled, (state, action) => {
      state.point.loading = false;
      state.point.data = action.payload.data;
    });
    builder.addCase(getPointById.rejected, (state, action) => {
      state.point.loading = false;
      state.point.error = action.error?.message || 'unknown';
    });
    builder.addCase(initPoint.fulfilled, (state, action) => {
      state.point = action.payload;
    });
  },
});

const selectSelf = state => state.point;

export const selectPointPage = createSelector(
  selectSelf,
  state => state.pointPage,
);

export const selectPointList = createSelector(
  selectSelf,
  state => state.pointList,
);

export const selectPoint = createSelector(selectSelf, state => state.point);

export default pointSlice.reducer;
