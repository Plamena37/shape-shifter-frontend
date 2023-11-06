import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { api } from "../../utils/axios.config";
import { EditExercise, Exercise } from "../../utils/interfaces";
import { API_BASE_URL } from "../../utils/constants";
import { ExercisesInitialState } from "../slice.types";
import { ExercisesSliceActionTypePrefix } from "../../utils/enums";

const {
  EXERCISES_CREATE,
  EXERCISES_GET_ALL,
  EXERCISES_GET_ONE,
  EXERCISES_UPDATE,
  EXERCISES_DELETE,
} = ExercisesSliceActionTypePrefix;

type errMessage = {
  message: string;
};

const initialState: ExercisesInitialState = {
  error: null,
  loadingType: null,
  successType: null,
  exercises: [],
  exercise: null,
};

export const createExercise = createAsyncThunk(
  EXERCISES_CREATE,
  async (exerciseData: Exercise) => {
    try {
      const response = await api.post(
        `${API_BASE_URL}/exercises`,
        exerciseData
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

export const getAllExercises = createAsyncThunk(EXERCISES_GET_ALL, async () => {
  try {
    const response = await api.get(`${API_BASE_URL}/exercises/findByUser`);
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError<errMessage>(error)) {
      throw new Error(error.response?.data.message);
    } else {
      throw new Error("An error occurred");
    }
  }
});

export const getExerciseById = createAsyncThunk(
  EXERCISES_GET_ONE,
  async (exerciseId: string) => {
    try {
      const response = await api.get(`${API_BASE_URL}/exercises/${exerciseId}`);
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

export const updateExerciseById = createAsyncThunk(
  EXERCISES_UPDATE,
  async ({
    exerciseId,
    exerciseData,
  }: {
    exerciseId: string;
    exerciseData: EditExercise;
  }) => {
    try {
      const response = await api.patch(
        `${API_BASE_URL}/exercises/${exerciseId}`,
        exerciseData
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

export const deleteExercise = createAsyncThunk(
  EXERCISES_DELETE,
  async (exerciseId: string) => {
    try {
      const response = await api.delete(
        `${API_BASE_URL}/exercises/${exerciseId}`
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

const exerciseSlice = createSlice({
  name: "exercise",
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
      .addCase(createExercise.pending, (state) => {
        state.loadingType = EXERCISES_CREATE;
        state.successType = null;
        state.error = null;
      })
      .addCase(createExercise.fulfilled, (state) => {
        state.loadingType = null;
        state.successType = EXERCISES_CREATE;
      })
      .addCase(createExercise.rejected, (state, action) => {
        state.loadingType = null;
        state.error = action.payload ?? "An error occured!";
      })
      .addCase(getAllExercises.pending, (state) => {
        state.loadingType = EXERCISES_GET_ALL;
        state.successType = null;
        state.error = null;
      })
      .addCase(getAllExercises.fulfilled, (state, action) => {
        state.loadingType = null;
        state.successType = EXERCISES_GET_ALL;
        state.exercises = action.payload;
      })
      .addCase(getAllExercises.rejected, (state, action) => {
        state.loadingType = null;
        state.exercises = [];
        state.error = action.payload ?? "An error occured!";
      })
      .addCase(getExerciseById.pending, (state) => {
        state.loadingType = EXERCISES_GET_ONE;
        state.successType = null;
        state.error = null;
      })
      .addCase(getExerciseById.fulfilled, (state, action) => {
        state.loadingType = null;
        state.successType = EXERCISES_GET_ONE;
        state.exercise = action.payload;
      })
      .addCase(getExerciseById.rejected, (state, action) => {
        state.exercise = null;
        state.loadingType = null;
        state.error = action.payload ?? "An error occured!";
      })
      .addCase(updateExerciseById.pending, (state) => {
        state.loadingType = EXERCISES_UPDATE;
        state.successType = null;
        state.error = null;
      })
      .addCase(updateExerciseById.fulfilled, (state) => {
        state.loadingType = null;
        state.successType = EXERCISES_UPDATE;
      })
      .addCase(updateExerciseById.rejected, (state, action) => {
        state.loadingType = null;
        state.error = action.payload ?? "An error occured!";
      })
      .addCase(deleteExercise.pending, (state) => {
        state.loadingType = EXERCISES_DELETE;
        state.successType = null;
        state.error = null;
      })
      .addCase(deleteExercise.fulfilled, (state) => {
        state.loadingType = null;
        state.successType = EXERCISES_DELETE;
      })
      .addCase(deleteExercise.rejected, (state, action) => {
        state.loadingType = null;
        state.error = action.payload ?? "An error occured!";
      });
  },
});

export const { clearSuccessType, clearError } = exerciseSlice.actions;
export default exerciseSlice.reducer;
