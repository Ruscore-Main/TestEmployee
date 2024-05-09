import { configureStore } from '@reduxjs/toolkit';

import userSlice from './slices/userSlice';
import jobsSlice from './slices/jobsSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    jobs: jobsSlice
  },
});

store.subscribe(() => {
  console.log(store.getState());
});
