import { createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../api/restController';

export const getTodosRequest = createAsyncThunk(
  'GET_USER_TODOS',
  async (_, { rejectWithValue }) => {
    try {
      return await API.getUserTodos();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateUserTodoRequest = createAsyncThunk(
  'UPDATE_TODO',
  async (data: any, { rejectWithValue }) => {
    try {
      return await API.updateUserTodo(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
