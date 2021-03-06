import { createSlice } from '@reduxjs/toolkit';
import {
  getTodosRequest,
  updateUserTodoRequest,
  deleteUserTodoRequest,
  createTodoRequest,
} from '../payloadCreators/todoPayload';
import { Todo } from '../interfaces';

interface State {
  isFetching: boolean;
  error: any;
  todos: Todo[];
}

const initialState: State = {
  isFetching: false,
  error: null,
  todos: [],
};

const todos = createSlice({
  name: 'todos',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createTodoRequest.fulfilled, (state, action) => {
        state.isFetching = false;
        state.error = null;
        state.todos = [...state.todos, action.payload];
      })
      .addCase(createTodoRequest.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
      })
      .addCase(createTodoRequest.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(getTodosRequest.fulfilled, (state, action) => {
        state.todos = action.payload;
        state.isFetching = false;
        state.error = null;
      })
      .addCase(getTodosRequest.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
      })
      .addCase(getTodosRequest.pending, state => {
        state.error = null;
        state.isFetching = true;
      })
      .addCase(updateUserTodoRequest.fulfilled, (state, action) => {
        state.error = null;
        state.isFetching = false;
        const { payload } = action;
        state.todos = state.todos.map(todo => {
          if (todo.id === payload.id) {
            return payload;
          }
          return todo;
        });
      })
      .addCase(updateUserTodoRequest.rejected, (state, action) => {
        state.error = action.payload;
        state.isFetching = false;
      })
      .addCase(updateUserTodoRequest.pending, state => {
        state.isFetching = true;
        state.error = null;
      })
      .addCase(deleteUserTodoRequest.fulfilled, (state, action) => {
        state.isFetching = false;
        state.error = null;
        state.todos = state.todos.filter(todo => todo.id !== action.payload);
      })
      .addCase(deleteUserTodoRequest.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
      })
      .addCase(deleteUserTodoRequest.pending, state => {
        state.isFetching = true;
        state.error = null;
      });
  },
});

export default todos;
