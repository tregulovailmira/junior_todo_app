import { configureStore } from '@reduxjs/toolkit';
import auth from '../reducers/authReducer';
import todos from '../reducers/todosReducer';
import uploadAttachments from '../reducers/uploadAttachmentReducer';

const store = configureStore({
  reducer: {
    login: auth.reducer,
    todos: todos.reducer,
    uploadAttachments: uploadAttachments.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
