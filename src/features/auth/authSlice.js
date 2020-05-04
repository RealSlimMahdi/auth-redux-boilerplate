import { createSlice } from "@reduxjs/toolkit";
import { Auth } from "aws-amplify";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    hasAuthenticated: false,
    isAuthenticated: false,
    profile: null,
    session: null,
    user: null,
  },
  reducers: {
    getProfile: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.profile = action.payload;
      state.hasAuthenticated = true;
      state.isAuthenticated = true;
      // state.user = action.payload.attributes.name;
    },
    getSession: (state, action) => {
      state.session = action.payload;
    },
    endAuth: (state, action) => {
      state.loading = false;
      state.hasAuthenticated = true;
    },
    logOut: (state, action) => {
      state.hasAuthenticated = false;
      state.isAuthenticated = false;
      state.profile = null;
      state.session = null;
    },
  },
});

export const { getProfile, getSession, endAuth, logOut } = authSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getCurrentUserAsync = (user) => (dispatch) => {
  Auth.currentAuthenticatedUser()
    .then((user) => {
      dispatch(getProfile(user));
    })
    .catch((err) => {
      console.log(err);
    });
};

export const authLogOut = () => (dispatch) => {
  dispatch(logOut());
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectProfile = (state) => state.profile;
export const selectSession = (state) => state.session;
export const selectIsAuthenticated = (state) => state.isAuthenticated;
export const selectHasAuthenticated = (state) => state.hasAuthenticated;

export default authSlice.reducer;
