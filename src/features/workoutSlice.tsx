import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { api } from "../utils/axios.config";
import {
  EditWorkout,
  ExerciseType,
  Measurement,
  Workout,
} from "../utils/interfaces";
import { API_BASE_URL } from "../utils/constants";

type errMessage = {
  message: string;
};

const initialState = {
  workouts: [] as Workout[],
  filteredWorkouts: [] as Workout[],
  workout: {} as Workout,
  filteredExerciseTypes: [] as ExerciseType[],
  filteredMeasurements: [] as Measurement[],
};

export const createWorkout = createAsyncThunk(
  "workouts/createWorkout",
  async (workoutData: Workout) => {
    try {
      const response = await api.post(`${API_BASE_URL}/workouts`, workoutData);
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

export const getAllWorkouts = createAsyncThunk(
  "workouts/getAllWorkouts",
  async () => {
    try {
      const response = await api.get(`${API_BASE_URL}/workouts/findByUser`);
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

export const updateWorkoutById = createAsyncThunk(
  "workouts/updateWorkoutById",
  async ({
    workoutId,
    workoutData,
  }: {
    workoutId: string;
    workoutData: EditWorkout;
  }) => {
    try {
      const response = await api.patch(
        `${API_BASE_URL}/workouts/${workoutId}`,
        workoutData
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

export const deleteWorkout = createAsyncThunk(
  "workouts/deleteWorkout",
  async (workoutId: string) => {
    try {
      const response = await api.delete(
        `${API_BASE_URL}/workouts/${workoutId}`
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

export const searchWorkouts = createAsyncThunk(
  "workouts/searchWorkouts",
  async (filterCriteria: {
    exerciseType: string;
    muscleGroups: string[];
    date: Date | string;
  }) => {
    try {
      const response = await api.get(`${API_BASE_URL}/workouts/search`, {
        params: filterCriteria,
      });
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

export const filterExerciseTypes = createAsyncThunk(
  "workouts/filterExerciseTypes",
  async (filterCriteria: {
    startDate: Date | string;
    endDate: Date | string;
  }) => {
    try {
      const response = await api.get(
        `${API_BASE_URL}/workouts/exerciseTypeProgress`,
        {
          params: filterCriteria,
        }
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

export const filterMeasurements = createAsyncThunk(
  "workouts/filterMeasurements",
  async (filterCriteria: {
    startDate: Date | string;
    endDate: Date | string;
  }) => {
    try {
      const response = await api.get(
        `${API_BASE_URL}/workouts/exerciseTypeProgress`,
        {
          params: filterCriteria,
        }
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

const workoutSlice = createSlice({
  name: "workout",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createWorkout.fulfilled, (state, action) => {
        state.workouts.push(action.payload);
      })
      .addCase(getAllWorkouts.fulfilled, (state, action) => {
        state.workouts = action.payload;
      })
      .addCase(updateWorkoutById.fulfilled, (state, action) => {
        const updatedWorkout = action.payload;
        const index = state.workouts.findIndex(
          (workout) => workout._id === updatedWorkout._id
        );
        if (index !== -1) {
          state.workouts[index] = updatedWorkout;
        }
      })
      .addCase(deleteWorkout.fulfilled, (state, action) => {
        const deletedWorkoutId = action.meta.arg;
        state.workouts = state.workouts.filter(
          (workout) => workout._id !== deletedWorkoutId
        );
      })
      .addCase(searchWorkouts.fulfilled, (state, action) => {
        state.filteredWorkouts = action.payload;
      })
      .addCase(filterExerciseTypes.fulfilled, (state, action) => {
        state.filteredExerciseTypes = action.payload;
      })
      .addCase(filterMeasurements.fulfilled, (state, action) => {
        state.filteredMeasurements = action.payload;
      });
  },
});

export default workoutSlice.reducer;
