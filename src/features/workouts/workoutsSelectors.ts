import type { RootState } from "../../app/store";

const workoutsSelector = (state: RootState) => state.workout;

export const selectWorkouts = (state: RootState) =>
  workoutsSelector(state).workouts;

export const selectWorkout = (state: RootState) =>
  workoutsSelector(state).workout;

export const selectWorkoutsFilteredByExerciseType = (state: RootState) =>
  workoutsSelector(state).filteredExerciseTypes;

export const selectWorkoutsFilteredByMeasurements = (state: RootState) =>
  workoutsSelector(state).filteredMeasurements;

export const selectFilteredWorkouts = (state: RootState) =>
  workoutsSelector(state).filteredWorkouts;

export const selectWorkoutsIsLoading = (state: RootState) =>
  workoutsSelector(state).loadingType;

export const selectWorkoutsHasSuccess = (state: RootState) =>
  workoutsSelector(state).successType;

export const selectWorkoutsError = (state: RootState) =>
  workoutsSelector(state).error;
