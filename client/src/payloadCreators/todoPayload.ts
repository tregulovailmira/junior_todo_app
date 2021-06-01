import { createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../api/restController';

export const createTodoRequest = createAsyncThunk(
  'CREATE_USER_TODO',
  async (data: any, { rejectWithValue }) => {
    try {
      const { data: newTodo } = await API.createUserTodo(data);
      return newTodo;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getTodosRequest = createAsyncThunk(
  'GET_USER_TODOS',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await API.getUserTodos();
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateUserTodoRequest = createAsyncThunk(
  'UPDATE_TODO',
  async (data: any, { rejectWithValue }) => {
    try {
      const { data: updatedTodo } = await API.updateUserTodo(data);
      return updatedTodo;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteUserTodoRequest = createAsyncThunk(
  'DELETE_TODO',
  async (id: number, { rejectWithValue }) => {
    try {
      await API.deleteUserTodo(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);
