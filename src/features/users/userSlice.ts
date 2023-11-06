import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/axios.config";
import { API_BASE_URL } from "../../utils/constants";
import { User } from "../../utils/interfaces";
import { isAxiosError } from "../../utils/functions";
import { ROLE, UsersSliceActionTypePrefix } from "../../utils/enums";
import { UsersInitialState } from "../slice.types";

const {
  USERS_GET_ALL,
  USERS_GET_ONE,
  USERS_UPDATE,
  USERS_UPDATE_ROLE,
  USERS_DELETE,
} = UsersSliceActionTypePrefix;

type errMessage = {
  message: string;
};

const initialState: UsersInitialState = {
  error: null,
  loadingType: null,
  successType: null,
  user: null,
  users: [],
};

export const getUserById = createAsyncThunk(
  USERS_GET_ONE,
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
  USERS_UPDATE,
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

export const getAllUsers = createAsyncThunk(USERS_GET_ALL, async () => {
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
  USERS_UPDATE_ROLE,
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
  USERS_DELETE,
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
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccessType: (state) => {
      state.successType = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUserById.pending, (state) => {
        state.loadingType = USERS_GET_ONE;
        state.successType = null;
        state.error = null;
      })
      .addCase(getUserById.fulfilled, (state, action) => {
        state.loadingType = null;
        state.successType = USERS_GET_ONE;
        state.user = action.payload;
      })
      .addCase(getUserById.rejected, (state, action) => {
        state.user = null;
        state.loadingType = null;
        state.error = action.payload ?? "An error occured!";
      })
      .addCase(updateUserById.pending, (state) => {
        state.loadingType = USERS_UPDATE;
        state.successType = null;
        state.error = null;
      })
      .addCase(updateUserById.fulfilled, (state, action) => {
        state.loadingType = null;
        state.successType = USERS_UPDATE;
        state.user = action.payload;
      })
      .addCase(updateUserById.rejected, (state, action) => {
        state.loadingType = null;
        state.error = action.payload ?? "An error occured!";
      })
      .addCase(getAllUsers.pending, (state) => {
        state.loadingType = USERS_GET_ALL;
        state.successType = null;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loadingType = null;
        state.successType = USERS_GET_ALL;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loadingType = null;
        state.users = [];
        state.error = action.payload ?? "An error occured!";
      })
      .addCase(deleteUser.pending, (state) => {
        state.loadingType = USERS_DELETE;
        state.error = null;
      })
      .addCase(deleteUser.fulfilled, (state) => {
        state.loadingType = null;
        state.successType = USERS_DELETE;
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.loadingType = null;
        state.error = action.payload ?? "An error occured!";
      })
      .addCase(updateRole.pending, (state) => {
        state.loadingType = USERS_UPDATE_ROLE;
        state.error = null;
      })
      .addCase(updateRole.fulfilled, (state) => {
        state.loadingType = null;
        state.successType = USERS_UPDATE_ROLE;
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.loadingType = null;
        state.error = action.payload ?? "An error occured!";
      });
  },
});

export const { clearSuccessType, clearError } = userSlice.actions;
export default userSlice.reducer;
