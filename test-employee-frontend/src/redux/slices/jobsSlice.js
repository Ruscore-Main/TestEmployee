import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userAPI } from 'api/api';

// Регистрация пользователя
export const getJobs = createAsyncThunk('jobs/getJobs', async (params) => {

    const jobs = await userAPI.getJobs();
    return jobs;
});

// {
//   "tests": [],
//   "users": [],
//   "id": 1,
//   "jobTitleName": "Должность1"
// }

const initialState = {
  status: 'loading', // loading | success | error
  items: []
};

const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {},
  
  extraReducers: (builder) => {

    builder.addCase(getJobs.pending, (state) => {
        state.status = 'loading';
        state.items = [];
    });

    builder.addCase(getJobs.fulfilled, (state, action) => {
        state.status = 'success';
        state.items = action.payload;
    });

    builder.addCase(getJobs.rejected, (state) => {
        state.status = 'error';
        state.items = [];
    });
    
  },
});

export default jobsSlice.reducer;
