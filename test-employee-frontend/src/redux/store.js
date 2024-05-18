import { configureStore } from '@reduxjs/toolkit';

import userSlice from './slices/userSlice';
import jobsSlice from './slices/jobsSlice';
import adminSlice from './slices/adminSlice';
import adminFilterSlice from './slices/adminFilterSlice';
import testSlice from './slices/testSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    jobs: jobsSlice,
    admin: adminSlice,
    adminFilter: adminFilterSlice,
    tests: testSlice
  },
});

store.subscribe(() => {
  console.log(store.getState());
});
