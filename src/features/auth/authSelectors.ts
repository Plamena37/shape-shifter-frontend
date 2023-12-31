import type { RootState } from "../../app/store";

const authSelector = (state: RootState) => state.auth;

export const selectIsUserLoggedIn = (state: RootState) =>
  authSelector(state).isLoggedIn;

export const selectAuthHasError = (state: RootState) =>
  authSelector(state).error;

export const selectAuthErrorType = (state: RootState) =>
  authSelector(state).errorType;

export const selectAuthIsLoading = (state: RootState) =>
  authSelector(state).loadingType;

export const selectAuthSuccessType = (state: RootState) =>
  authSelector(state).successType;
