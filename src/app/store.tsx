import { configureStore } from "@reduxjs/toolkit";
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import userReducer from "../features/users/userSlice";
import measurementReducer from "../features/measurements/measurementsSlice";
import exerciseTypeReducer from "../features/exerciseTypes/exerciseTypesSlice";
import exerciseReducer from "../features/exercises/exercisesSlice";
import workoutReducer from "../features/workouts/workoutSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    user: userReducer,
    measurement: measurementReducer,
    exerciseType: exerciseTypeReducer,
    exercise: exerciseReducer,
    workout: workoutReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
