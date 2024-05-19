import { configureStore } from '@reduxjs/toolkit';

import userSlice from './slices/userSlice';
import jobsSlice from './slices/jobsSlice';
import adminSlice from './slices/adminSlice';
import adminFilterSlice from './slices/adminFilterSlice';
import testSlice from './slices/testSlice';
import fullTestSlice from './slices/fullTestSlice';
import questionSlice from './slices/questionSlice';

export const store = configureStore({
  reducer: {
    user: userSlice,
    jobs: jobsSlice,
    admin: adminSlice,
    adminFilter: adminFilterSlice,
    tests: testSlice,
    fullTest: fullTestSlice,
    questions: questionSlice
  },
});

store.subscribe(() => {
  console.log(store.getState());
});
