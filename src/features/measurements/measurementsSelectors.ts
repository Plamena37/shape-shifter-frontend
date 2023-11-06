import type { RootState } from "../../app/store";

const measurementsSelector = (state: RootState) => state.measurement;

export const selectMeasurements = (state: RootState) =>
  measurementsSelector(state).measurements;

export const selectMeasurement = (state: RootState) =>
  measurementsSelector(state).measurement;

export const selectMeasurementsIsLoading = (state: RootState) =>
  measurementsSelector(state).loadingType;

export const selectMeasurementsSuccessType = (state: RootState) =>
  measurementsSelector(state).successType;

export const selectMeasurementsErrorType = (state: RootState) =>
  measurementsSelector(state).errorType;

export const selectMeasurementsError = (state: RootState) =>
  measurementsSelector(state).error;
