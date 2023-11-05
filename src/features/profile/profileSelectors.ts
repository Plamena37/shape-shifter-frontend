import type { RootState } from "../../app/store";

const profileSelector = (state: RootState) => state.profile;

export const selectProfileIsLoading = (state: RootState) =>
  profileSelector(state).loadingType;

export const selectProfileHasSuccess = (state: RootState) =>
  profileSelector(state).successType;

export const selectProfileHasError = (state: RootState) =>
  profileSelector(state).error;

export const selectCurrentUser = (state: RootState) =>
  profileSelector(state).currentUser;

export const selectIsCurrentUserAdmin = (state: RootState) =>
  profileSelector(state).isUserAdmin;
