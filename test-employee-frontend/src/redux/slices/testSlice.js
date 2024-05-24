import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { testAPI } from 'api/api';

export const fetchTests = createAsyncThunk('tests/fetchTests', async (params) => {
  const tests = (await testAPI.getTests(params)).data;

  return tests;
});

export const addTest = createAsyncThunk('tests/addTest', async (params) => {
  const test = (await testAPI.addTest(params)).data;

  return test;
});

const initialState = {
  status: 'loading', // loading | error | success
  items: [],
  amountPages: null,
  currentPage: 1
};

const testSlice = createSlice({
  name: 'tests',
  initialState: initialState,
  reducers: {
    setTest(state, action) {
      state.items = action.payload;
    },
    setCurrentTestPage(state, action) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTests.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchTests.fulfilled, (state, action) => {
      state.status = 'success';
      state.items = action.payload.items;
      state.amountPages = action.payload.amountPages;
    });
    builder.addCase(fetchTests.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });
  },
});

export const { setTest, setCurrentTestPage } = testSlice.actions;

export default testSlice.reducer;
