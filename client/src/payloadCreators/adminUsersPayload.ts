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

export const deleteUserRequest = createAsyncThunk<number, number, { rejectValue: MyError }>(
  'DELETE_USER',
  async (id: number, { rejectWithValue }) => {
    try {
      await API.deleteUser(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
