import type { RootState } from "../../app/store";

const authSelector = (state: RootState) => state.auth;

export const selectIsUserLoggedIn = (state: RootState) =>
  authSelector(state).isLoggedIn;
