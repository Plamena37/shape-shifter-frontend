import type { RootState } from "../../app/store";

const exercisesSelector = (state: RootState) => state.exercise;

export const selectExercises = (state: RootState) =>
  exercisesSelector(state).exercises;

export const selectExercise = (state: RootState) =>
  exercisesSelector(state).exercise;

export const selectExercisesIsLoading = (state: RootState) =>
  exercisesSelector(state).loadingType;

export const selectExercisesSuccessType = (state: RootState) =>
  exercisesSelector(state).successType;

export const selectExercisesErrorType = (state: RootState) =>
  exercisesSelector(state).errorType;

export const selectExercisesError = (state: RootState) =>
  exercisesSelector(state).error;
