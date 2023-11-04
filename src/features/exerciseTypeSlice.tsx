import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isAxiosError } from "axios";
import { api } from "../utils/axios-interceptor";
import { EditExerciseType, ExerciseType } from "../utils/common-interfaces";
import { API_BASE_URL } from "../utils/common-constants";

type errMessage = {
  message: string;
};

const initialState = {
  exerciseTypes: [] as ExerciseType[],
  filteredExerciseTypes: [] as ExerciseType[],
  exerciseType: {} as ExerciseType,
};

export const createExerciseType = createAsyncThunk(
  "exerciseTypes/createExerciseType",
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
  "exerciseTypes/getAllExerciseTypes",
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
  "exerciseTypes/getExerciseTypeById",
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
  "exerciseTypes/updateExerciseTypeById",
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
  "exerciseTypes/deleteExerciseType",
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
  "exerciseTypes/filterExerciseTypes",
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
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createExerciseType.fulfilled, (state, action) => {
        state.exerciseTypes.push(action.payload);
      })
      .addCase(getAllExerciseTypes.fulfilled, (state, action) => {
        state.exerciseTypes = action.payload;
      })
      .addCase(getExerciseTypeById.fulfilled, (state, action) => {
        state.exerciseType = action.payload;
      })
      .addCase(updateExerciseTypeById.fulfilled, (state, action) => {
        const updatedExerciseType = action.payload;
        const index = state.exerciseTypes.findIndex(
          (exerciseType) => exerciseType._id === updatedExerciseType._id
        );
        if (index !== -1) {
          state.exerciseTypes[index] = updatedExerciseType;
        }
      })
      .addCase(deleteExerciseType.fulfilled, (state, action) => {
        const deletedExerciseTypeId = action.meta.arg;
        state.exerciseTypes = state.exerciseTypes.filter(
          (exerciseType) => exerciseType._id !== deletedExerciseTypeId
        );
      })
      .addCase(filterExerciseTypes.fulfilled, (state, action) => {
        state.filteredExerciseTypes = action.payload;
      });
  },
});

export default exerciseTypeSlice.reducer;
