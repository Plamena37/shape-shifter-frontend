import { configureStore } from "@reduxjs/toolkit";
import {
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import userReducer from "../features/userSlice";
import measurementReducer from "../features/measurementSlice";
import exerciseTypeReducer from "../features/exerciseTypes/exerciseTypeSlice";
import exerciseReducer from "../features/exerciseSlice";
import workoutReducer from "../features/workoutSlice";

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
