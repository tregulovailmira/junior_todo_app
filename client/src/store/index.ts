import { configureStore } from '@reduxjs/toolkit';
import auth from '../reducers/authReducer';

const store = configureStore({
  reducer: {
    login: auth.reducer
  }
});

export default store;
