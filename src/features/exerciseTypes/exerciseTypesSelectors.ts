import type { RootState } from "../../app/store";

const exerciseTypesSelector = (state: RootState) => state.exerciseType;

export const selectExerciseTypes = (state: RootState) =>
  exerciseTypesSelector(state).exerciseTypes;

export const selectExerciseType = (state: RootState) =>
  exerciseTypesSelector(state).exerciseType;

export const selectFilteredExerciseType = (state: RootState) =>
  exerciseTypesSelector(state).filteredExerciseTypes;

export const selectExerciseTypesIsLoading = (state: RootState) =>
  exerciseTypesSelector(state).loadingType;

export const selectExerciseTypesHasSuccess = (state: RootState) =>
  exerciseTypesSelector(state).successType;

export const selectExerciseTypesError = (state: RootState) =>
  exerciseTypesSelector(state).error;
