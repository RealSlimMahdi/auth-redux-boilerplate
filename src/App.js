import React, { useEffect } from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import { Auth, Hub } from "aws-amplify";
import { useDispatch } from "react-redux";
import { getProfile, authLogOut } from "./features/auth/authSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Load the current User
    Auth.currentAuthenticatedUser()
      .then((user) => {
        dispatch(getProfile(JSON.stringify(user)));
      })
      .catch((err) => console.log(err));

    // set listener for auth events
    Hub.listen("auth", async (data) => {
      //   setImmediate(() => dispatch({ type: "LOADING" }));
      const { payload } = data;
      if (payload.event === "signIn") {
        console.log("SignIn !!!!!");
        setImmediate(() => dispatch(getProfile(JSON.stringify(payload.data))));
        // setImmediate(() => dispatch({ type: "LOGIN_USER", payload: payload.data }));
      } else if (payload.event === "signOut") {
        setImmediate(() => dispatch(authLogOut()));
        // setImmediate(() => dispatch({ type: "SIGNOUT_USER" }));
        console.log("SignOut !!!!!");
      }
    });
    return () => {
      console.log("CLEANING...");
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <span>
          <span>Learn </span>
          <a className="App-link" href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">
            React
          </a>
          <span>, </span>
          <a className="App-link" href="https://redux.js.org/" target="_blank" rel="noopener noreferrer">
            Redux
          </a>
          <span>, </span>
          <a className="App-link" href="https://redux-toolkit.js.org/" target="_blank" rel="noopener noreferrer">
            Redux Toolkit
          </a>
          ,<span> and </span>
          <a className="App-link" href="https://react-redux.js.org/" target="_blank" rel="noopener noreferrer">
            React Redux
          </a>
        </span>
      </header>
      <div>
        <button onClick={() => Auth.federatedSignIn({ provider: "Google" })}>Google Sign In</button>
        <button
          onClick={() =>
            Auth.currentAuthenticatedUser()
              .then((user) => console.log(user))
              .catch((err) => console.log(err))
          }
        >
          Check User
        </button>
        <button onClick={() => Auth.signOut()}>SignOut</button>
      </div>
    </div>
  );
}

export default App;
