import type { RootState } from "../../app/store";

const usersSelector = (state: RootState) => state.user;

export const selectUsers = (state: RootState) => usersSelector(state).users;

export const selectUser = (state: RootState) => usersSelector(state).user;

export const selectUserIsLoading = (state: RootState) =>
  usersSelector(state).loadingType;

export const selectUserHasSuccess = (state: RootState) =>
  usersSelector(state).successType;

export const selectUserError = (state: RootState) => usersSelector(state).error;
