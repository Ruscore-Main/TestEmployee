import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    currentPage: 1,
    searchValue: ''
};

const adminFilterSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setSearchValue(state, action) {
        state.currentPage = 1;
        state.searchValue = action.payload;
    },
    setCurrentPage(state, action) {
        state.currentPage = action.payload;
    },
    resetFilters(state) {
      state.searchValue = "";
      state.currentPage = 1;
    }
  }
});

export const { setSearchValue, setCurrentPage, resetFilters } = adminFilterSlice.actions;

export default adminFilterSlice.reducer;