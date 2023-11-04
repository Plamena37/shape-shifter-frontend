import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { api } from "../utils/axios-interceptor";
import { EditExercise, Exercise } from "../utils/common-interfaces";
import { API_BASE_URL } from "../utils/common-constants";

type errMessage = {
  message: string;
};

const initialState = {
  exercises: [] as Exercise[],
  exercise: {} as Exercise,
};

export const createExercise = createAsyncThunk(
  "exercises/createExercise",
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

export const getAllExercises = createAsyncThunk(
  "exercises/getAllExercises",
  async () => {
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
  }
);

export const getExerciseById = createAsyncThunk(
  "exercises/getExerciseById",
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
  "exercises/updateExerciseById",
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
  "exercises/deleteExercise",
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
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createExercise.fulfilled, (state, action) => {
        state.exercises.push(action.payload);
      })
      .addCase(getAllExercises.fulfilled, (state, action) => {
        state.exercises = action.payload;
      })
      .addCase(getExerciseById.fulfilled, (state, action) => {
        state.exercise = action.payload;
      })
      .addCase(updateExerciseById.fulfilled, (state, action) => {
        const updatedExercise = action.payload;
        const index = state.exercises.findIndex(
          (exercise) => exercise._id === updatedExercise._id
        );
        if (index !== -1) {
          state.exercises[index] = updatedExercise;
        }
      })
      .addCase(deleteExercise.fulfilled, (state, action) => {
        const deletedExerciseId = action.meta.arg;
        state.exercises = state.exercises.filter(
          (exercise) => exercise._id !== deletedExerciseId
        );
      });
  },
});

export default exerciseSlice.reducer;
