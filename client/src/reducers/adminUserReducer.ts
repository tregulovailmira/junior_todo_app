import { createSlice } from '@reduxjs/toolkit';
import { MyError, User } from '../interfaces';
import { getAllUsersRequest } from '../payloadCreators/adminUsersPayload';

interface State {
  isFetching: boolean;
  error: MyError | null | undefined;
  users: User[];
}

const initialState: State = {
  isFetching: false,
  error: null,
  users: [],
};

const users = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getAllUsersRequest.fulfilled, (state, action) => {
        state.isFetching = false;
        state.error = null;
        state.users = action.payload;
      })
      .addCase(getAllUsersRequest.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
      })
      .addCase(getAllUsersRequest.pending, state => {
        state.isFetching = true;
        state.error = null;
      });
  },
});

export default users;
