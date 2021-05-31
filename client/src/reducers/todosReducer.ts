import { createSlice } from '@reduxjs/toolkit';
import {
  getTodosRequest,
  updateUserTodoRequest,
  deleteUserTodoRequest,
} from '../payloadCreators/todoPayload';

interface State {
  isFetching: boolean;
  error: any;
  todos: any[];
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
      .addCase(getTodosRequest.fulfilled, (state, action) => {
        state.todos = action.payload.data;
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
        const {
          payload: { data },
        } = action;
        state.todos = state.todos.map(todo => {
          if (todo.id === data.id) {
            return data;
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
