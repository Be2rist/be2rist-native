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
};

export const getNearbyPoints = createAsyncThunk(
  'point/getNearbyPoints',
  async (request, {rejectWithValue, getState}) => {
    try {
      const {language} = request;
      delete request.language;
      const params = isEmpty(request)
        ? {...getState().point.pointPage.page, languages: [language]}
        : request;
      const response = await functions().httpsCallable('point-getNearbyPoints')(
        {...params, location: GeolocationFlow.location},
      );
      return {data: response.data, params};
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

const pointSlice = createSlice({
  name: 'point',
  initialState,
  extraReducers: builder => {
    builder.addCase(getNearbyPoints.pending, state => {
      state.pointPage.loading = true;
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
  },
});

const selectSelf = state => state.point;

export const selectPointPage = createSelector(
  selectSelf,
  state => state.pointPage,
);

export default pointSlice.reducer;
