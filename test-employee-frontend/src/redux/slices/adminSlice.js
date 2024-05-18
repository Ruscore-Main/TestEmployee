import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { adminAPI } from "api/api";

export const fetchUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (params) => {
    // params === { searchValue, currentPage };
    const data = await adminAPI.getUsers({limit: 5, ...params});
    return data;
  }
);


const initialState = {
  users: [],
  status: "loading",
  amountPages: 0
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(fetchUsers.pending, (state) => {
        state.users = [];
        state.status = "loading";
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload.items;
        state.amountPages = action.payload.amountPages;
        state.status = "success";
    });

    builder.addCase(fetchUsers.rejected, (state) => {
        state.users = [];
        state.status = "error";
    })
    
  }
});

export default adminSlice.reducer;
