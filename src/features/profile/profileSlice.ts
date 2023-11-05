import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../utils/axios.config";
import { ROLE, UsersSliceActionTypePrefix } from "../../utils/enums";
import type { ProfileInitialState } from "../slice.types";
import { API_BASE_URL } from "../../utils/constants";

const { USERS_GET_ONE } = UsersSliceActionTypePrefix;

const initialState: ProfileInitialState = {
  error: null,
  loadingType: null,
  successType: null,
  currentUser: null,
  isUserAdmin: false,
};

export const getCurrentUser = createAsyncThunk(
  USERS_GET_ONE,
  async (userId: string) => {
    const response = await api.get(`${API_BASE_URL}/users/${userId}`);
    return response.data;
  }
);

const profileSlice = createSlice({
  extraReducers: (builder) => {
    builder
      .addCase(getCurrentUser.pending, (state) => {
        state.loadingType = USERS_GET_ONE;
        state.error = null;
        state.isUserAdmin = false;
        state.successType = null;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.loadingType = null;
        state.successType = USERS_GET_ONE;
        state.currentUser = action.payload;
        state.isUserAdmin = action.payload.role === ROLE.ADMIN;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.loadingType = null;
        state.successType = null;
        state.currentUser = null;
        state.error = action.error;
      });
  },
  initialState,
  name: "profile",
  reducers: {
    clearCurrentUser: (state) => {
      state.currentUser = null;
      state.isUserAdmin = false;
    },
  },
});

export const { clearCurrentUser } = profileSlice.actions;
export default profileSlice.reducer;
