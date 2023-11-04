import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import authReducer from "../features/authSlice";
import userReducer from "../features/userSlice";
import measurementReducer from "../features/measurementSlice";
import exerciseTypeReducer from "../features/exerciseTypeSlice";
import exerciseReducer from "../features/exerciseSlice";
import workoutReducer from "../features/workoutSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
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
