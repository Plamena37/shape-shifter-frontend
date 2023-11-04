import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API_BASE_URL } from "../../utils/common-constants";
import { LoginUser, SignupUser } from "../../utils/common-interfaces";
import { isAxiosError } from "../../utils/common-functions";
import axios from "axios";
import { AuthInitialState } from "../slice.types";

type errMessage = {
  message: string;
};

const initialState: AuthInitialState = {
  error: null,
  isLoading: false,
  isSuccess: false,
  isLoggedIn: Boolean(localStorage.getItem("token")),
};

export const signup = createAsyncThunk(
  "users/signup",
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
  "users/login",
  async (formData: LoginUser) => {
    try {
      const response = await axios.post("/auth", formData);
      return response.data;
    } catch (error: unknown) {
      console.log(error);
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
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = false;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        const token = action.payload.token;
        state.isLoggedIn = true;
        localStorage.setItem("token", token);
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.error = action.payload ?? action?.error;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
