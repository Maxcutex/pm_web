import React from "react";
import axios from 'axios';
import { setUserSession, removeUserSession } from './../utils/common';
import { config } from '../config';
import { getToken } from '../utils/common'
import { isValid } from '../utils/jwtDecode'

export const baseUrl = config.PM_API_BASE_URL;
var UserStateContext = React.createContext();
var UserDispatchContext = React.createContext();

function userReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return { ...state, isAuthenticated: true };
    case "SIGN_OUT_SUCCESS":
      return { ...state, isAuthenticated: false };
    case "LOGIN_FAILURE":
      return { ...state, isAuthenticated: false, errorMessage: action.payload };
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

function UserProvider({ children }) {
  var [state, dispatch] = React.useReducer(userReducer, {
    isExpired: !isValid(getToken()),
    isAuthenticated: !!sessionStorage.getItem("token"),

    token: !!getToken(),
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
    axios.post(`${baseUrl}/api/v1/users/login`,
      { username: login, password: password })
      .then(response => {
        setIsLoading(false);
        setUserSession(response.data.payload.token, response.data.payload.user);
        dispatch({ type: "LOGIN_SUCCESS" });
        console.log("login successful")
        history.push('/app/dashboard');
      }).catch(error => {
        console.log("error response", error.response)
        if (error.response === undefined) {
          setErrorMsg("Something went wrong. Please try again later.");
        }
        else if (error.response.status === 401 || error.response.status === 400) {
          setErrorMsg(error.response.data.msg);
        }
        else {
          setErrorMsg("Something went wrong. Please try again later.");
        }
        setError(true);
        setIsLoading(false);
      });
  } else {
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
