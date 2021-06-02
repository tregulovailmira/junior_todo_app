import { createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../api/restController';
import { MyError, User } from '../interfaces';

export const getAllUsersRequest = createAsyncThunk<User[], undefined, { rejectValue: MyError }>(
  'GET_ALL_USERS',
  async (filters: any, { rejectWithValue }) => {
    try {
      const { data } = await API.getAllUsers();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
