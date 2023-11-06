import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { api } from "../../utils/axios.config";
import { EditWorkout, Workout } from "../../utils/interfaces";
import { API_BASE_URL } from "../../utils/constants";
import { WorkoutsInitialState } from "../slice.types";
import { WorkoutsSliceActionTypePrefix } from "../../utils/enums";

const {
  WORKOUTS_CREATE,
  WORKOUTS_GET_ALL,
  WORKOUTS_UPDATE,
  WORKOUTS_DELETE,
  WORKOUTS_SEARCH,
  WORKOUTS_FILTER_EXERCISE_TYPES,
  WORKOUTS_FILTER_MEASUREMENTS,
} = WorkoutsSliceActionTypePrefix;

type errMessage = {
  message: string;
};

const initialState: WorkoutsInitialState = {
  error: null,
  loadingType: null,
  successType: null,
  workouts: [],
  workout: null,
  filteredWorkouts: [],
  filteredExerciseTypes: [],
  filteredMeasurements: [],
};

export const createWorkout = createAsyncThunk(
  WORKOUTS_CREATE,
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

export const getAllWorkouts = createAsyncThunk(WORKOUTS_GET_ALL, async () => {
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
});

export const updateWorkoutById = createAsyncThunk(
  WORKOUTS_UPDATE,
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
  WORKOUTS_DELETE,
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
  WORKOUTS_SEARCH,
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
  WORKOUTS_FILTER_EXERCISE_TYPES,
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
  WORKOUTS_FILTER_MEASUREMENTS,
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
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccessType: (state) => {
      state.successType = null;
    },
    clearFilteredWorkouts: (state) => {
      state.filteredWorkouts = [];
    },
    clearWorkoutsFilteredExerciseTypes: (state) => {
      state.filteredExerciseTypes = [];
    },
    clearWorkoutsFilteredMeasurements: (state) => {
      state.filteredMeasurements = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createWorkout.pending, (state) => {
        state.loadingType = WORKOUTS_CREATE;
        state.successType = null;
        state.error = null;
      })
      .addCase(createWorkout.fulfilled, (state) => {
        state.loadingType = null;
        state.successType = WORKOUTS_CREATE;
      })
      .addCase(createWorkout.rejected, (state, action) => {
        state.loadingType = null;
        state.error = action.payload ?? "An error occured!";
      })
      .addCase(getAllWorkouts.pending, (state) => {
        state.loadingType = WORKOUTS_GET_ALL;
        state.successType = null;
        state.error = null;
      })
      .addCase(getAllWorkouts.fulfilled, (state, action) => {
        state.loadingType = null;
        state.successType = WORKOUTS_GET_ALL;
        state.workouts = action.payload;
      })
      .addCase(getAllWorkouts.rejected, (state, action) => {
        state.loadingType = null;
        state.workouts = [];
        state.error = action.payload ?? "An error occured!";
      })
      .addCase(updateWorkoutById.pending, (state) => {
        state.loadingType = WORKOUTS_UPDATE;
        state.successType = null;
        state.error = null;
      })
      .addCase(updateWorkoutById.fulfilled, (state) => {
        state.loadingType = null;
        state.successType = WORKOUTS_UPDATE;
      })
      .addCase(updateWorkoutById.rejected, (state, action) => {
        state.loadingType = null;
        state.error = action.payload ?? "An error occured!";
      })
      // ------------------------------------------------------------
      .addCase(deleteWorkout.pending, (state) => {
        state.loadingType = WORKOUTS_DELETE;
        state.successType = null;
        state.error = null;
      })
      .addCase(deleteWorkout.fulfilled, (state) => {
        state.loadingType = null;
        state.successType = WORKOUTS_DELETE;
      })
      .addCase(deleteWorkout.rejected, (state, action) => {
        state.loadingType = null;
        state.error = action.payload ?? "An error occured!";
      })
      .addCase(searchWorkouts.pending, (state) => {
        state.loadingType = WORKOUTS_SEARCH;
        state.successType = null;
        state.error = null;
      })
      .addCase(searchWorkouts.fulfilled, (state, action) => {
        state.loadingType = null;
        state.successType = WORKOUTS_SEARCH;
        state.filteredWorkouts = action.payload;
      })
      .addCase(searchWorkouts.rejected, (state, action) => {
        state.loadingType = null;
        state.error = action.payload ?? "An error occured!";
        state.filteredWorkouts = [];
      })
      .addCase(filterExerciseTypes.pending, (state) => {
        state.loadingType = WORKOUTS_FILTER_EXERCISE_TYPES;
        state.successType = null;
        state.error = null;
      })
      .addCase(filterExerciseTypes.fulfilled, (state, action) => {
        state.loadingType = null;
        state.successType = WORKOUTS_FILTER_EXERCISE_TYPES;
        state.filteredExerciseTypes = action.payload;
      })
      .addCase(filterExerciseTypes.rejected, (state, action) => {
        state.loadingType = null;
        state.error = action.payload ?? "An error occured!";
        state.filteredExerciseTypes = [];
      })
      .addCase(filterMeasurements.pending, (state) => {
        state.loadingType = WORKOUTS_FILTER_MEASUREMENTS;
        state.successType = null;
        state.error = null;
      })
      .addCase(filterMeasurements.fulfilled, (state, action) => {
        state.loadingType = null;
        state.successType = WORKOUTS_FILTER_MEASUREMENTS;
        state.filteredMeasurements = action.payload;
      })
      .addCase(filterMeasurements.rejected, (state, action) => {
        state.loadingType = null;
        state.error = action.payload ?? "An error occured!";
        state.filteredMeasurements = [];
      });
  },
});

export const {
  clearSuccessType,
  clearError,
  clearFilteredWorkouts,
  clearWorkoutsFilteredExerciseTypes,
  clearWorkoutsFilteredMeasurements,
} = workoutSlice.actions;
export default workoutSlice.reducer;
