import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import functions from '@react-native-firebase/functions';

const initialState = {
  routeList: {
    list: [],
    loading: false,
    error: null,
  },
  route: {
    data: {
      language: 'pl',
    },
    loading: false,
    error: null,
  },
};

export const getRoutes = createAsyncThunk(
  'route/getAll',
  async (request, {rejectWithValue}) => {
    try {
      const response = await functions().httpsCallable('route-getAll')(request);

      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const getUserRoutes = createAsyncThunk(
  'route/getAllByUser',
  async (request, {rejectWithValue}) => {
    try {
      const response = await functions().httpsCallable('route-getAllByUser')();
      return {data: response.data};
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const getRouteById = createAsyncThunk(
  'route/getById',
  async (request, {rejectWithValue}) => {
    try {
      const response = await functions().httpsCallable('route-getById')(
        request,
      );
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  },
);

export const initRoute = createAsyncThunk(
  'route/init',
  () => initialState.route,
);

const routeSlice = createSlice({
  name: 'route',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getRoutes.pending, state => {
        state.routeList.loading = true;
        state.routeList.error = null;
      })
      .addCase(getRoutes.fulfilled, (state, action) => {
        state.routeList.loading = false;
        state.routeList.list = action.payload;
      })
      .addCase(getRoutes.rejected, (state, action) => {
        state.routeList.loading = false;
        state.routeList.error = action.error?.message || 'unknown';
      })
      .addCase(getRouteById.pending, state => {
        state.route.loading = true;
        state.route.data = null;
        state.route.error = null;
      })
      .addCase(getRouteById.fulfilled, (state, action) => {
        state.route.loading = false;
        state.route.data = action.payload;
      })
      .addCase(getRouteById.rejected, (state, action) => {
        state.route.loading = false;
        state.route.error = action.error?.message || 'unknown';
      })
      .addCase(initRoute.fulfilled, (state, action) => {
        state.route = action.payload;
      })
      .addCase(getUserRoutes.pending, state => {
        state.routeList.loading = true;
        state.routeList.list = [];
        state.routeList.error = null;
      })
      .addCase(getUserRoutes.fulfilled, (state, action) => {
        state.routeList.loading = false;
        state.routeList.list = action.payload.data;
      })
      .addCase(getUserRoutes.rejected, (state, action) => {
        state.routeList.loading = false;
        state.routeList.error = action.error?.message || 'unknown';
      });
  },
});

const selectSelf = state => state.route;

export const selectRouteList = createSelector(
  selectSelf,
  state => state.routeList,
);

export const selectRoute = createSelector(selectSelf, state => state.route);

export default routeSlice.reducer;
