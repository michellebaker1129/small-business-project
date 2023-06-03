import React, { useReducer, createContext } from "react";
import jwtDecode from "jwt-decode";

import { LOGIN_STATES } from "./constants";

const initalState = {
  user: null,
};

const token = localStorage.getItem("token");

if (token) {
  const decodedToken = jwtDecode(token);

  if (decodedToken.exp * 1000 < Date.now()) {
    localStorage.removeItem("token");
  } else {
    initalState.user = decodedToken;
    initalState.token = token;
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => { },
  logout: () => { },
});

function authReducer(state, action) {
  switch (action.type) {
    case LOGIN_STATES.LOGIN:
      return {
        ...state,
        user: action.payload,
        error: null,
      };
    case LOGIN_STATES.LOGOUT:
      return {
        ...state,
        user: null,
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initalState);

  const login = (userData) => {
    localStorage.setItem("token", userData.token);
    dispatch({
      type: LOGIN_STATES.LOGIN,
      payload: userData,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch({
      type: LOGIN_STATES.LOGOUT,
    });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };
