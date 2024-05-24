import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminAPI } from "api/api";

export const getTestResultsReport = createAsyncThunk('reports/getTestResultsReport', async (params) => {
    const testResults = (await adminAPI.getTestResults(params)).data;
    return testResults;
});

const initialState = {
    status: "loading",
    items: [],
    amountPages: null,
    currentPage: 1,
    sortBy: { name: 'Опыту работы (ASC)', sort: 'workExperience'}
}

const reportSlice = createSlice({
    name: 'reports',
    initialState,
    reducers: {
        setCurrentReportPage(state, action) {
            state.currentPage = action.payload;
        },
        setSortBy(state, action) {
            state.sortBy = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTestResultsReport.pending, (state) => {
            state.status = "loading";
            state.items = [];
            state.amountPages = null;
        });

        builder.addCase(getTestResultsReport.fulfilled, (state, action) => {
            state.status = "success";
            state.items = action.payload.items;
            state.amountPages = action.payload.amountPages;
        });

        builder.addCase(getTestResultsReport.rejected, (state) => {
            state.status = "error";
            state.items = [];
            state.amountPages = null;
            state.currentPage = 1;
        })
    }
})


export const {setCurrentReportPage, setSortBy} = reportSlice.actions;

export default reportSlice.reducer;