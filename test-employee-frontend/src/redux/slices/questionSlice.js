import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { testAPI } from 'api/api';

export const fetchQuestions = createAsyncThunk('tests/fetchQuestions', async (params) => {
  const questions = (await testAPI.getQuestions({limit: 10, ...params})).data;    // params === { searchValue, currentPage };

  return questions;
});


const initialState = {
  status: 'loading', // loading | error | success
  items: [],
  amountPages: null,
  searchQuestion: '',
  currentQuestionPage: 1
};

const questionSlice = createSlice({
  name: 'questions',
  initialState: initialState,
  reducers: {
    setQuestions(state, action) {
      state.items = action.payload;
    },
    setCurrentQuestionPage(state, action) {
      state.currentQuestionPage = action.payload;
    },
    setSearchQuestion(state, action) {
      state.searchQuestion = action.payload;
    }

  },
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      state.status = 'success';
      state.items = action.payload.items;
      state.amountPages = action.payload.amountPages;
    });
    builder.addCase(fetchQuestions.rejected, (state) => {
      state.status = 'error';
      state.items = [];
    });
  },
});

export const { setQuestions, setCurrentQuestionPage, setSearchQuestion } = questionSlice.actions;

export default questionSlice.reducer;
