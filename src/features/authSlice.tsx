import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../utils/common-constants";
import { AuthState, LoginUser, SignupUser } from "../utils/common-interfaces";
import { isAxiosError } from "../utils/common-functions";
import axios from "axios";

type errMessage = {
  message: string;
};

const checkIsLoggedIn = () => {
  const token = localStorage.getItem("token");
  return !!token;
};

const initialState: AuthState = {
  isLoggedIn: checkIsLoggedIn(),
};

export const signup = createAsyncThunk(
  "users/signup",
  async (formData: SignupUser) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/users`, formData);
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError<errMessage>(error)) {
        throw new Error(error.response?.data.message);
      } else {
        throw new Error("An error occurred during signup.");
      }
    }
  }
);

export const login = createAsyncThunk(
  "users/login",
  async (formData: LoginUser) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth`, formData);
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError<errMessage>(error)) {
        throw new Error(error.response?.data.message);
      } else {
        throw new Error("An error occurred during login.");
      }
    }
  }
);

const authSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    logout(state) {
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
    checkIsLoggedIn(state) {
      state.isLoggedIn = checkIsLoggedIn();
    },
  },
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      const token = action.payload.token;
      state.isLoggedIn = true;
      localStorage.setItem("token", token);
    });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
