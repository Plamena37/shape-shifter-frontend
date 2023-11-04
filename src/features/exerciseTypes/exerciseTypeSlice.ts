import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { api } from "../../utils/axios.config";
import { EditExerciseType, ExerciseType } from "../../utils/interfaces";
import { API_BASE_URL } from "../../utils/constants";
import { ExerciseTypesInitialState } from "../slice.types";
import { ExerciseTypesSliceActionTypePrefix } from "../../utils/enums";

const {
  EXERCISE_TYPES_CREATE,
  EXERCISE_TYPES_GET_ALL,
  EXERCISE_TYPES_GET_ONE,
  EXERCISE_TYPES_UPDATE,
  EXERCISE_TYPES_DELETE,
  EXERCISE_TYPES_FILTER,
} = ExerciseTypesSliceActionTypePrefix;

type errMessage = {
  message: string;
};

const initialState: ExerciseTypesInitialState = {
  error: null,
  loadingType: null,
  successType: null,
  exerciseTypes: [],
  filteredExerciseTypes: [],
  exerciseType: null,
};

export const createExerciseType = createAsyncThunk(
  EXERCISE_TYPES_CREATE,
  async (exerciseTypeData: ExerciseType) => {
    try {
      const response = await api.post(
        `${API_BASE_URL}/exercise-types`,
        exerciseTypeData
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

export const getAllExerciseTypes = createAsyncThunk(
  EXERCISE_TYPES_GET_ALL,
  async () => {
    try {
      const response = await api.get(`${API_BASE_URL}/exercise-types`);
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

export const getExerciseTypeById = createAsyncThunk(
  EXERCISE_TYPES_GET_ONE,
  async (exerciseTypeId: string) => {
    try {
      const response = await api.get(
        `${API_BASE_URL}/exercise-types/${exerciseTypeId}`
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

export const updateExerciseTypeById = createAsyncThunk(
  EXERCISE_TYPES_UPDATE,
  async ({
    exerciseTypeId,
    exerciseTypeData,
  }: {
    exerciseTypeId: string;
    exerciseTypeData: EditExerciseType;
  }) => {
    try {
      const response = await api.patch(
        `${API_BASE_URL}/exercise-types/${exerciseTypeId}`,
        exerciseTypeData
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

export const deleteExerciseType = createAsyncThunk(
  EXERCISE_TYPES_DELETE,
  async (exerciseTypeId: string) => {
    try {
      const response = await api.delete(
        `${API_BASE_URL}/exercise-types/${exerciseTypeId}`
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

export const filterExerciseTypes = createAsyncThunk(
  EXERCISE_TYPES_FILTER,
  async (filterCriteria: { name: string; muscleGroups: string[] }) => {
    try {
      const response = await api.get(`${API_BASE_URL}/exercise-types/search`, {
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

const exerciseTypeSlice = createSlice({
  name: "exerciseTypes",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccessType: (state) => {
      state.successType = null;
    },
    clearFilteredExerciseTypes: (state) => {
      state.filteredExerciseTypes = [];
    },
  },
  extraReducers(builder) {
    builder
      .addCase(createExerciseType.pending, (state) => {
        state.loadingType = EXERCISE_TYPES_CREATE;
        state.successType = null;
        state.error = null;
      })
      .addCase(createExerciseType.fulfilled, (state) => {
        state.loadingType = null;
        state.successType = EXERCISE_TYPES_CREATE;
      })
      .addCase(createExerciseType.rejected, (state, action) => {
        state.loadingType = null;
        state.error = action.payload ?? "An error occured!";
      })
      .addCase(getAllExerciseTypes.pending, (state) => {
        state.loadingType = EXERCISE_TYPES_GET_ALL;
        state.successType = null;
        state.error = null;
      })
      .addCase(getAllExerciseTypes.fulfilled, (state, action) => {
        state.loadingType = null;
        state.successType = EXERCISE_TYPES_GET_ALL;
        state.exerciseTypes = action.payload;
      })
      .addCase(getAllExerciseTypes.rejected, (state, action) => {
        state.loadingType = null;
        state.exerciseTypes = [];
        state.error = action.payload ?? "An error occured!";
      })
      .addCase(getExerciseTypeById.pending, (state) => {
        state.loadingType = EXERCISE_TYPES_GET_ONE;
        state.successType = null;
        state.error = null;
      })
      .addCase(getExerciseTypeById.fulfilled, (state, action) => {
        state.loadingType = null;
        state.successType = EXERCISE_TYPES_GET_ONE;
        state.exerciseType = action.payload;
      })
      .addCase(getExerciseTypeById.rejected, (state, action) => {
        state.exerciseType = null;
        state.loadingType = null;
        state.error = action.payload ?? "An error occured!";
      })
      .addCase(updateExerciseTypeById.pending, (state) => {
        state.loadingType = EXERCISE_TYPES_UPDATE;
        state.successType = null;
        state.error = null;
      })
      .addCase(updateExerciseTypeById.fulfilled, (state) => {
        state.loadingType = null;
        state.successType = EXERCISE_TYPES_UPDATE;
      })
      .addCase(updateExerciseTypeById.rejected, (state, action) => {
        state.loadingType = null;
        state.error = action.payload ?? "An error occured!";
      })

      .addCase(deleteExerciseType.pending, (state) => {
        state.loadingType = EXERCISE_TYPES_DELETE;
        state.error = null;
      })
      .addCase(deleteExerciseType.fulfilled, (state) => {
        state.loadingType = null;
        state.successType = EXERCISE_TYPES_DELETE;
      })
      .addCase(deleteExerciseType.rejected, (state, action) => {
        state.loadingType = null;
        state.error = action.payload ?? "An error occured!";
      })

      .addCase(filterExerciseTypes.fulfilled, (state, action) => {
        state.filteredExerciseTypes = action.payload;
      });
  },
});

export const { clearSuccessType, clearError, clearFilteredExerciseTypes } =
  exerciseTypeSlice.actions;
export default exerciseTypeSlice.reducer;
