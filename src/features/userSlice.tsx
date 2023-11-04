import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../utils/axios-interceptor";
import { API_BASE_URL } from "../utils/common-constants";
import { User } from "../utils/common-interfaces";
import { isAxiosError } from "../utils/common-functions";
import { ROLE } from "../utils/common-enums";

type errMessage = {
  message: string;
};

const initialState = {
  user: {} as User,
  users: [] as User[],
};

export const getUserById = createAsyncThunk(
  "users/getUserById",
  async (userId: string) => {
    try {
      const response = await api.get(`${API_BASE_URL}/users/${userId}`);
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError<errMessage>(error)) {
        throw new Error(error.response?.data.message);
      } else {
        throw new Error("An error occurred");
      }
    }
  }
);

export const updateUserById = createAsyncThunk(
  "users/updateUserById",
  async ({ userId, userData }: { userId: string; userData: User }) => {
    try {
      const response = await api.patch(
        `${API_BASE_URL}/users/${userId}`,
        userData
      );
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError<errMessage>(error)) {
        throw new Error(error.response?.data.message);
      } else {
        throw new Error("An error occurred");
      }
    }
  }
);

export const getAllUsers = createAsyncThunk("users/getAllUsers", async () => {
  try {
    const response = await api.get(`${API_BASE_URL}/users/`);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError<errMessage>(error)) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("An error occurred");
    }
  }
});

export const updateRole = createAsyncThunk(
  "users/updateRole",
  async ({
    userId,
    userRole,
  }: {
    userId: string;
    userRole: ROLE.ADMIN | ROLE.USER;
  }) => {
    try {
      const response = await api.patch(
        `${API_BASE_URL}/users/change-role/${userId}`,
        { role: userRole }
      );
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError<errMessage>(error)) {
        throw new Error(error.response?.data.message);
      } else {
        throw new Error("An error occurred");
      }
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/deleteUser",
  async (userId: string) => {
    try {
      const response = await api.delete(`${API_BASE_URL}/users/${userId}`);
      return response.data;
    } catch (error: unknown) {
      if (isAxiosError<errMessage>(error)) {
        throw new Error(error.response?.data.message);
      } else {
        throw new Error("An error occurred");
      }
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserById.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        const { userId, userRole } = action.meta.arg;

        state.users = state.users.map((user: User) =>
          user._id === userId ? { ...user, role: userRole } : user
        );
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const deletedUserId = action.meta.arg;
        state.users = state.users.filter((user) => user._id !== deletedUserId);
      });
  },
});

export default userSlice.reducer;
