import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { userAPI } from 'api/api';
import { getUserFromLS } from 'utils/getUserFromLS';

// Регистрация пользователя
export const regUser = createAsyncThunk('user/regUser', async (params) => {
  try {
    const user = (await userAPI.registerUser(params)).data;
    return user;
  } catch (error) {
    return error.response.data;
  }
});

// Авторизация пользователя
export const authUser = createAsyncThunk('user/authUser', async (params) => {
  const { login, password } = params;
  try {
    const user = (await userAPI.authorizateUser(login, password)).data;
    return user;
  } catch (error) {
    return error.response.data;
  }
});

// Обновление информации о пользователе
export const updateUser = createAsyncThunk('user/updateUser', async (params) => {
  try {
    const user = (await userAPI.updateUser(params)).data;
    return user;
  } catch (error) {
    return error.response.data;
  }
});

export const getTestResults = createAsyncThunk('user/getTestResults', async (params) => {
  const testResults = (await userAPI.getTestResults(params)).data;
  return testResults;
});

export const setTestResult = createAsyncThunk('user/setTestResult', async (params) => {
  const user = (await userAPI.setTestResult(params)).data;
  return user;
});


const initialState = getUserFromLS();

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.id = action.payload.id;
      state.login = action.payload.login;
      state.password = action.payload.password;
      state.role = action.payload.role;
      state.fio = action.payload.fio;
      state.workExperience = action.payload.workExperience;
      state.dateOfBirth = action.payload.dateOfBirth;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      state.jobId = action.payload.jobId;
      state.jobTitle = action.payload.jobTitle;
      state.testResults = action.payload.testResults;
    },
    removeUser(state) {
      state.id = null;
      state.login = null;
      state.password = null;
      state.role = null;
      state.fio = null;
      state.workExperience = null;
      state.dateOfBirth = null;
      state.email = null;
      state.phoneNumber = null;
      state.jobId = null;
      state.jobTitle = "";
      state.testResults = [];
    },
  },
  extraReducers: (builder) => {

    builder.addCase(authUser.fulfilled, (state, action) => {
      if (action.payload?.login) {
        userSlice.caseReducers.setUser(state, action);
      }
    });

    builder.addCase(updateUser.fulfilled, (state, action) => {
      if (action.payload?.id) {
        state.login = action.payload.login;
        state.email = action.payload.email;
        state.phoneNumber = action.payload.phoneNumber;
      }
    });

    builder.addCase(getTestResults.fulfilled, (state, action) => {
      if (action.payload) {
        state.testResults = action.payload.items;
      }
    });

    builder.addCase(setTestResult.fulfilled, (state, action) => {
      if (action.payload) {
        state.testResults = [...state.testResults, action.payload];
      }
    })
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
