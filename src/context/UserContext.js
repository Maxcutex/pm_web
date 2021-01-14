import React from "react";
import axios from 'axios';
import {setUserSession, removeUserSession} from './../utils/common';

var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isAuthenticated: !!localStorage.getItem("id_token"),
  });

  return (
    <UserStateContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserStateContext.Provider>
  );
}

function useUserState() {
  var context = React.useContext(UserStateContext);
  if (context === undefined) {
    throw new Error("useUserState must be used within a UserProvider");
  }
  return context;
}

function useUserDispatch() {
  var context = React.useContext(UserDispatchContext);
  if (context === undefined) {
    throw new Error("useUserDispatch must be used within a UserProvider");
  }
  return context;
}

export { UserProvider, useUserState, useUserDispatch, loginUser, signOut };

// ###########################################################

function loginUser(dispatch, login, password, history, setIsLoading, setError, setErrorMsg) {
  setError(false);
  setIsLoading(true);

  if (!!login && !!password) {
    setTimeout(() => {
      localStorage.setItem('id_token', 1)
      setError(null)
      setIsLoading(false)
      dispatch({ type: 'LOGIN_SUCCESS' })

      history.push('/app/dashboard')
    }, 2000);
    // axios.post('http://localhost:5000/users/authenticate', { username: login.value, password: password.value }).then(response => {
    //   setIsLoading(false);
    //   setUserSession(response.data.token, response.data.user);
    //   history.push('/dashboard');
    // }).catch(error => {
    //   dispatch({ type: "LOGIN_FAILURE" });
    //   setError(true);
    //   if (error.response.status === 401) {
    //     setErrorMsg(error.response.data.message);
    //   }
    //   else {
    //     setErrorMsg("Something went wrong. Please try again later.");
    //   }
    // });
  } else {
    dispatch({ type: "LOGIN_FAILURE" });
    setError(true);
    setIsLoading(false);
    setErrorMsg("Something is wrong with your login or password.");
  }
}

function signOut(dispatch, history) {
  localStorage.removeItem("id_token");
  removeUserSession();
  dispatch({ type: "SIGN_OUT_SUCCESS" });
  history.push("/login");
}
