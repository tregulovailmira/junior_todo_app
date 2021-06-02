import { createAsyncThunk } from '@reduxjs/toolkit';
import * as API from '../api/restController';
import { MyError } from '../interfaces';
import { Todo, DataForUpdateStatus } from '../interfaces';

export const createTodoRequest = createAsyncThunk<Todo, Todo, { rejectValue: MyError }>(
  'CREATE_USER_TODO',
  async (data: Todo, { rejectWithValue }) => {
    try {
      const { data: newTodo } = await API.createUserTodo(data);
      return newTodo;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getTodosRequest = createAsyncThunk<Todo[], undefined, { rejectValue: MyError }>(
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

export const updateUserTodoRequest = createAsyncThunk<
  Todo,
  DataForUpdateStatus,
  { rejectValue: MyError }
>('UPDATE_TODO', async (data: DataForUpdateStatus, { rejectWithValue }) => {
  try {
    const { data: updatedTodo } = await API.updateUserTodo(data);
    return updatedTodo;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const deleteUserTodoRequest = createAsyncThunk<number, number, { rejectValue: MyError }>(
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
