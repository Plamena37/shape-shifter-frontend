import type { SerializedError } from "@reduxjs/toolkit";
import { ExerciseType } from "../utils/common-interfaces";

export type InitialState = {
  error: SerializedError | null;
  loadingType: string | null;
  successType: string | null;
};

export type AuthInitialState = InitialState & {
  isLoggedIn: boolean;
};

export type ExerciseTypesInitialState = InitialState & {
  exerciseTypes: ExerciseType[] | null;
  exerciseType: ExerciseType | null;
  filteredExerciseTypes: ExerciseType[];
};
