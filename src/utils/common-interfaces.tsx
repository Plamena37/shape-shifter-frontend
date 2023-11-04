import { GENDER, ROLE } from "./common-enums";

export interface User {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role?: ROLE.ADMIN | ROLE.USER;
  gender: GENDER.FEMALE | GENDER.MALE;
  dateOfBirth: string;
  height: string;
  __v?: number;
}

export interface SignupUser {
  name: string;
  email: string;
  password: string;
  gender: string;
  dateOfBirth: string;
  height: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface AuthState {
  isLoggedIn: boolean;
}

export interface TextFieldLabelProps {
  shrink?: boolean;
}

export interface TextFieldInputProps {
  max?: string;
}

export interface ErrorsInArraySignup {
  name: boolean;
  email: boolean;
  password: boolean;
  dateOfBirth: boolean;
  gender: boolean;
  height: boolean;
}

export interface ErrorsInArrayLogin {
  email: boolean;
  password: boolean;
}

export interface ErrorsInArrayMeasurements {
  photoUrl: boolean;
  weight: boolean;
  chest: boolean;
  waist: boolean;
  hips: boolean;
  biceps: boolean;
}

export interface ErrorsInArrayExerciseTypes {
  name: boolean;
  muscleGroups: boolean;
}

export interface ErrorsInArrayExercises {
  exerciseType: boolean;
  series: boolean;
  repetitions: boolean;
  weight: boolean;
  time: boolean;
  distance: boolean;
}

export interface DecodedToken {
  email: string;
  id: string;
  iat: number;
  exp: number;
}

export interface Measurement {
  _id?: string;
  photoUrl: string;
  biceps: number;
  chest: number;
  hips: number;
  waist: number;
  weight: number;
  userId?: string;
  date?: string;
  __v?: number;
  [key: string]: any;
}

export interface EditMeasurement {
  _id?: string;
  photoUrl?: string;
  biceps?: number;
  chest?: number;
  hips?: number;
  waist?: number;
  weight?: number;
  userId?: string;
  date?: string;
  __v?: number;
}

export interface ExerciseType {
  _id?: string;
  name: string;
  muscleGroups: string[];
  __v?: number;
}

export interface EditExerciseType {
  _id?: string;
  name?: string;
  muscleGroups?: string[];
  __v?: number;
}

export interface Exercise {
  _id?: string;
  creatorId?: string;
  exerciseType: string;
  series: number;
  repetitions: number;
  weight: number;
  time: string;
  distance: number;
  __v?: number;
}

export interface EditExercise {
  _id?: string;
  creatorId?: string;
  exerciseType?: string;
  series?: number;
  repetitions?: number;
  weight?: number;
  time?: string;
  distance?: number;
  __v?: number;
}

export interface Workout {
  _id?: string;
  userId?: string;
  exercises: string[];
  date: string;
  __v?: number;
  found_exercise_types?: ExerciseType[];
}

export interface EditWorkout {
  _id?: string;
  userId?: string;
  exercises?: string[];
  date?: string;
  __v?: number;
}
