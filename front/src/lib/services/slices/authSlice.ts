

import { RootState } from "@/lib/services/store";
import { User } from "@/types/User";
import { createSelector, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  user: User | null;
  token: string | undefined;
};

const initialState: AuthState = {
  user: null,
  token: undefined,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, token },
      }: PayloadAction<{ user?: User; token?: string }>
    ) => {
      state.token = token;
      if (user) {
        state.user = user;
      }
    },
    resetCredentials: () => initialState,
  },
});

export const { setCredentials, resetCredentials } = slice.actions;

export default slice.reducer;

export const selectStateUser = (state: RootState) => state.auth;

export const selectCurrentUser = createSelector([selectStateUser], state => (state.user))

