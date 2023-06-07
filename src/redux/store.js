import { configureStore } from '@reduxjs/toolkit';
import { counterSlice } from './contact/contactSlice';

export const store = configureStore({
  reducer: {
    contact: counterSlice.reducer,
  },
});
