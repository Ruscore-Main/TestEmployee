import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { testAPI } from 'api/api';

export const fetchTest = createAsyncThunk('fullTest/getEditTest', async (params) => {
  const data = (await testAPI.getFullTest(params)).data;
  return data;
});

export const addQuestion = createAsyncThunk('tests/addQuestion', async (params) => {
  const question = (await testAPI.addQuestion(params)).data;

  return question;
});

export const deleteQuestion = createAsyncThunk('tests/deleteQuestion', async (params) => {
  const question = (await testAPI.deleteQuestion(params)).data;

  return question;
});

export const updateQuestion = createAsyncThunk('tests/updateQuestion', async (params) => {
  const question = (await testAPI.updateQuestion(params)).data;

  return question;
});


const initialState = {
  status: 'loading', // loading | success | error
  questions: [],
  id: null,
  name: '',
  timeTest: null,
  jobId: null,
};

const fullTestSlice = createSlice({
  name: 'fullTest',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTest.pending, (state) => {
      state.status = 'loading';
      state.id = null;
      state.name = '';
      state.timeTest = null;
      state.jobId = null;
      state.questions = [];
    });

    builder.addCase(fetchTest.fulfilled, (state, action) => {
      state.status = 'success';
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.timeTest = action.payload.timeTest;
      state.jobId = action.payload.jobId;
      state.questions = action.payload.questions;
    });

    builder.addCase(fetchTest.rejected, (state) => {
      state.status = 'error';
    });

    builder.addCase(deleteQuestion.fulfilled, (state, action) => {
      state.questions = [...state.questions.filter(el => el.id == action.payload.id)]
    });
  },
});

export default fullTestSlice.reducer;
