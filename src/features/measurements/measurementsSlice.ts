import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../utils/axios.config";
import { API_BASE_URL } from "../../utils/constants";
import { isAxiosError } from "../../utils/functions";
import { EditMeasurement, Measurement } from "../../utils/interfaces";
import { MeasurementsInitialState } from "../slice.types";
import { MeasurementsSliceActionTypePrefix } from "../../utils/enums";

const {
  MEASUREMENTS_CREATE,
  MEASUREMENTS_GET_ALL,
  MEASUREMENTS_GET_ONE,
  MEASUREMENTS_UPDATE,
  MEASUREMENTS_DELETE,
} = MeasurementsSliceActionTypePrefix;

type errMessage = {
  message: string;
};

const initialState: MeasurementsInitialState = {
  error: null,
  loadingType: null,
  successType: null,
  measurements: [],
  measurement: null,
};

export const createMeasurement = createAsyncThunk(
  MEASUREMENTS_CREATE,
  async (measurementData: Measurement) => {
    try {
      const response = await api.post(
        `${API_BASE_URL}/measurement-events`,
        measurementData
      );
      return response.data;
    } catch (error: unknown) {
      console.log(error);
      if (isAxiosError<errMessage>(error)) {
        throw new Error(error.response?.data.message);
      } else {
        throw new Error("An error occurred");
      }
    }
  }
);

export const getAllMeasurements = createAsyncThunk(
  MEASUREMENTS_GET_ALL,
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
  MEASUREMENTS_GET_ONE,
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
  MEASUREMENTS_UPDATE,
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
  MEASUREMENTS_DELETE,
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
      .addCase(createMeasurement.pending, (state) => {
        state.loadingType = MEASUREMENTS_CREATE;
        state.successType = null;
        state.error = null;
      })
      .addCase(createMeasurement.fulfilled, (state) => {
        state.loadingType = null;
        state.successType = MEASUREMENTS_CREATE;
      })
      .addCase(createMeasurement.rejected, (state, action) => {
        state.loadingType = null;
        state.error = action.payload ?? "An error occured!";
        console.log(action);
      })
      .addCase(getAllMeasurements.pending, (state) => {
        state.loadingType = MEASUREMENTS_GET_ALL;
        state.successType = null;
        state.error = null;
      })
      .addCase(getAllMeasurements.fulfilled, (state, action) => {
        state.loadingType = null;
        state.successType = MEASUREMENTS_GET_ALL;
        state.measurements = action.payload;
      })
      .addCase(getAllMeasurements.rejected, (state, action) => {
        state.loadingType = null;
        state.measurements = [];
        state.error = action.payload ?? "An error occured!";
      })
      .addCase(getMeasurementById.pending, (state) => {
        state.loadingType = MEASUREMENTS_GET_ONE;
        state.successType = null;
        state.error = null;
      })
      .addCase(getMeasurementById.fulfilled, (state, action) => {
        state.loadingType = null;
        state.successType = MEASUREMENTS_GET_ONE;
        state.measurement = action.payload;
      })
      .addCase(getMeasurementById.rejected, (state, action) => {
        state.measurement = null;
        state.loadingType = null;
        state.error = action.payload ?? "An error occured!";
      })
      .addCase(updateMeasurementById.pending, (state) => {
        state.loadingType = MEASUREMENTS_UPDATE;
        state.successType = null;
        state.error = null;
      })
      .addCase(updateMeasurementById.fulfilled, (state, action) => {
        state.loadingType = null;
        state.successType = MEASUREMENTS_UPDATE;
        state.measurement = action.payload;
      })
      .addCase(updateMeasurementById.rejected, (state, action) => {
        state.loadingType = null;
        state.error = action.payload ?? "An error occured!";
        state.measurement = null;
      })
      .addCase(deleteMeasurement.pending, (state) => {
        state.loadingType = MEASUREMENTS_DELETE;
        state.successType = null;
        state.error = null;
      })
      .addCase(deleteMeasurement.fulfilled, (state) => {
        state.loadingType = null;
        state.successType = MEASUREMENTS_DELETE;
      })
      .addCase(deleteMeasurement.rejected, (state, action) => {
        state.loadingType = null;
        state.error = action.payload ?? "An error occured!";
      });
  },
});

export default measurementSlice.reducer;
