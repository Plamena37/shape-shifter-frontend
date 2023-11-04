import type { SerializedError } from "@reduxjs/toolkit";

export type InitialState = {
  error: SerializedError | null;
  isLoading: boolean;
  isSuccess: boolean;
};

export type AuthInitialState = InitialState & {
  isLoggedIn: boolean;
};
