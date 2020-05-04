import React, { useEffect, useState } from "react";
import { Auth, Hub } from "aws-amplify";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, logOut, selectIsAuthenticated } from "./features/auth/authSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(selectIsAuthenticated);

  useEffect(() => {
    // Load the current User
    Auth.currentAuthenticatedUser()
      .then((user) => {
        setImmediate(() => dispatch(getProfile(JSON.stringify(user))));
        // setAuth(true);
      })
      .catch((err) => console.log(err));

    // set listener for auth events
    Hub.listen("auth", async (data) => {
      //   setImmediate(() => dispatch({ type: "LOADING" }));
      const { payload } = data;
      if (payload.event === "signIn") {
        setImmediate(() => dispatch(getProfile(JSON.stringify(payload.data))));
        // setAuth(true);
      } else if (payload.event === "signOut") {
        setImmediate(() => dispatch(logOut()));
        // setAuth(false);
      }
    });
    return () => {
      console.log("CLEANING...");
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <header className="App-header">{}</header>
      <div>
        {!auth && <button onClick={() => Auth.federatedSignIn({ provider: "Google" })}>Google Sign In</button>}
        <button
          onClick={() =>
            Auth.currentAuthenticatedUser()
              .then((user) => console.log(user))
              .catch((err) => console.log(err))
          }
        >
          Check User
        </button>
        <button onClick={() => dispatch(logOut())}>SignOut</button>
      </div>
    </div>
  );
}

export default App;
