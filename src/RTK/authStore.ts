import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';

export const authStore = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export type RootState = ReturnType<typeof authStore.getState>;
export type AppDispatch = typeof authStore.dispatch;
