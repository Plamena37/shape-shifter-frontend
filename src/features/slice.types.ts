import type { SerializedError } from "@reduxjs/toolkit";
import { ExerciseType, Measurement, User, Workout } from "../utils/interfaces";

export type InitialState = {
  error: SerializedError | null;
  loadingType: string | null;
  successType: string | null;
};

export type AuthInitialState = InitialState & {
  isLoggedIn: boolean;
};

export type ProfileInitialState = InitialState & {
  currentUser: User | null;
  isUserAdmin: boolean;
};

export type UsersInitialState = InitialState & {
  users: User[] | null;
  user: User | null;
};

export type MeasurementsInitialState = InitialState & {
  measurements: Measurement[] | null;
  measurement: Measurement | null;
};

export type ExerciseTypesInitialState = InitialState & {
  exerciseTypes: ExerciseType[] | null;
  exerciseType: ExerciseType | null;
  filteredExerciseTypes: ExerciseType[];
};

export type WorkoutsInitialState = InitialState & {
  workouts: Workout[] | null;
  workout: Workout | null;
  filteredWorkouts: Workout[];
  filteredExerciseTypes: ExerciseType[];
  filteredMeasurements: Measurement[];
};
