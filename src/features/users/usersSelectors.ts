import type { RootState } from "../../app/store";

const usersSelector = (state: RootState) => state.user;

export const selectUsers = (state: RootState) => usersSelector(state).users;

export const selectUser = (state: RootState) => usersSelector(state).user;

export const selectUserIsLoading = (state: RootState) =>
  usersSelector(state).loadingType;

export const selectUserSuccessType = (state: RootState) =>
  usersSelector(state).successType;

export const selectUserErrorType = (state: RootState) =>
  usersSelector(state).errorType;

export const selectUserError = (state: RootState) => usersSelector(state).error;
