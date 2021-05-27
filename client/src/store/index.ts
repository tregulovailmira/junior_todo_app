import { configureStore } from '@reduxjs/toolkit';
import auth from '../reducers/authReducer';

const store = configureStore({
  reducer: {
    login: auth.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
