import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../utils/axios-interceptor";
import { API_BASE_URL } from "../utils/common-constants";
import { isAxiosError } from "../utils/common-functions";
import { EditMeasurement, Measurement } from "../utils/common-interfaces";

type errMessage = {
  message: string;
};

const initialState = {
  measurements: [] as Measurement[],
  measurement: {} as Measurement,
};

export const createMeasurement = createAsyncThunk(
  "measurements/createMeasurement",
  async (measurementData: Measurement) => {
    try {
      const response = await api.post(
        `${API_BASE_URL}/measurement-events`,
        measurementData
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

export const getAllMeasurements = createAsyncThunk(
  "measurements/getAllMeasurements",
  async () => {
    try {
      const response = await api.get(`${API_BASE_URL}/measurement-events`);
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

export const getMeasurementById = createAsyncThunk(
  "measurements/getMeasurementById",
  async (measurementId: string) => {
    try {
      const response = await api.get(
        `${API_BASE_URL}/measurement-events/${measurementId}`
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

export const updateMeasurementById = createAsyncThunk(
  "measurements/updateMeasurementById",
  async ({
    measurementId,
    measurementData,
  }: {
    measurementId: string;
    measurementData: EditMeasurement;
  }) => {
    try {
      const response = await api.patch(
        `${API_BASE_URL}/measurement-events/${measurementId}`,
        measurementData
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

export const deleteMeasurement = createAsyncThunk(
  "measurements/deleteMeasurement",
  async (measurementId: string) => {
    try {
      const response = await api.delete(
        `${API_BASE_URL}/measurement-events/${measurementId}`
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

const measurementSlice = createSlice({
  name: "measurements",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createMeasurement.fulfilled, (state, action) => {
        state.measurements.push(action.payload);
      })
      .addCase(getAllMeasurements.fulfilled, (state, action) => {
        state.measurements = action.payload;
      })
      .addCase(getMeasurementById.fulfilled, (state, action) => {
        state.measurement = action.payload;
      })
      .addCase(updateMeasurementById.fulfilled, (state, action) => {
        state.measurement = action.payload;
      })
      .addCase(deleteMeasurement.fulfilled, (state, action) => {
        const deletedMeasurementId = action.meta.arg;
        state.measurements = state.measurements.filter(
          (measurement) => measurement._id !== deletedMeasurementId
        );
      });
  },
});

export default measurementSlice.reducer;
