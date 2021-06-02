import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../api/restController';
import { User, DataForAuth } from '../interfaces';
import { MyError } from '../interfaces';

interface State {
  isFetching: boolean;
  error: any;
  user: any;
}

const initialState: State = {
  isFetching: false,
  error: null,
  user: {},
};

export const authRequest = createAsyncThunk<User, DataForAuth, { rejectValue: MyError }>(
  'AUTH_REQUEST',
  async (data: any, { rejectWithValue }) => {
    try {
      const {
        data: { user },
      } = await API.loginRequest(data);
      return user;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(authRequest.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isFetching = false;
        state.error = null;
      })
      .addCase(authRequest.rejected, (state, action) => {
        state.error = action.payload;
        state.isFetching = false;
      })
      .addCase(authRequest.pending, state => {
        state.isFetching = true;
        state.error = null;
      });
  },
});
export default auth;
