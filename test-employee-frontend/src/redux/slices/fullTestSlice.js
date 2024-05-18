import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { testAPI } from "api/api";

export const fetchTest = createAsyncThunk('fullTest/getEditTest', async (params) => {
    const data = (await testAPI.getFullTest(params)).data;
    return data;
})

const initialState = {
    status: 'loading', // loading | success | error
    questions: [],
    id: null,
    name: '',
    timeTest: null,
    jobId: null
}

const fullTestSlice = createSlice({
    name: "fullTest",
    initialState: initialState,
    reducers: { },
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
    }
})



export default fullTestSlice.reducer;