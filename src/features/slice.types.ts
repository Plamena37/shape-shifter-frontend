import type { SerializedError } from "@reduxjs/toolkit";
import {
  Exercise,
  ExerciseType,
  Measurement,
  User,
  Workout,
} from "../utils/interfaces";

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
  errorType: string | null;
};

export type MeasurementsInitialState = InitialState & {
  measurements: Measurement[] | null;
  measurement: Measurement | null;
  errorType: string | null;
};

export type ExerciseTypesInitialState = InitialState & {
  exerciseTypes: ExerciseType[] | null;
  exerciseType: ExerciseType | null;
  filteredExerciseTypes: ExerciseType[];
  errorType: string | null;
};

export type ExercisesInitialState = InitialState & {
  exercises: Exercise[] | null;
  exercise: Exercise | null;
  errorType: string | null;
};

export type WorkoutsInitialState = InitialState & {
  workouts: Workout[] | null;
  workout: Workout | null;
  filteredWorkouts: Workout[];
  filteredExerciseTypes: ExerciseType[];
  filteredMeasurements: Measurement[];
};
