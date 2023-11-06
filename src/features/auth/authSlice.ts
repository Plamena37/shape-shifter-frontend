import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../utils/constants";
import { LoginUser, SignupUser } from "../../utils/interfaces";
import { isAxiosError } from "../../utils/functions";
import { UsersSliceActionTypePrefix } from "../../utils/enums";
import axios from "axios";
import { AuthInitialState } from "../slice.types";

const { USERS_CREATE, USERS_LOGIN } = UsersSliceActionTypePrefix;

type errMessage = {
  message: string;
};

const initialState: AuthInitialState = {
  error: null,
  errorType: null,
  loadingType: null,
  successType: null,
  isLoggedIn: Boolean(localStorage.getItem("token")),
};

export const signup = createAsyncThunk(
  USERS_CREATE,
  async (formData: SignupUser) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users`, formData);
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError<errMessage>(error)) {
        throw new Error(error.response?.data?.message);
      } else {
        throw new Error("An error occurred.");
      }
    }
  }
);

export const login = createAsyncThunk(
  USERS_LOGIN,
  async (formData: LoginUser) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth`, formData);
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError<errMessage>(error)) {
        throw new Error(
          error.response?.data?.message ?? "Invalid credentials."
        );
      } else {
        throw new Error("An error occurred.");
      }
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
    },
    checkIsLoggedIn(state) {
      state.isLoggedIn = Boolean(localStorage.getItem("token"));
    },
    clearSuccessType: (state) => {
      state.successType = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearErrorType: (state) => {
      state.errorType = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.isLoggedIn = false;
        state.loadingType = USERS_LOGIN;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const token = action.payload.token;
        localStorage.setItem("token", token);
        state.isLoggedIn = true;
        state.loadingType = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loadingType = null;
        state.successType = null;
        state.isLoggedIn = false;
        state.error = action.payload ?? action?.error;
        state.errorType = USERS_LOGIN;
      })
      .addCase(signup.pending, (state) => {
        state.loadingType = USERS_CREATE;
        state.error = null;
      })
      .addCase(signup.fulfilled, (state) => {
        state.successType = USERS_CREATE;
        state.loadingType = null;
      })
      .addCase(signup.rejected, (state, action) => {
        state.loadingType = null;
        state.errorType = USERS_CREATE;
        state.error = action.payload ?? action?.error;
      });
  },
});

export const {
  logout,
  checkIsLoggedIn,
  clearSuccessType,
  clearError,
  clearErrorType,
} = authSlice.actions;

export default authSlice.reducer;
