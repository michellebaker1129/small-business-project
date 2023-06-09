import React, { useReducer, createContext } from "react";
import PropTypes from "prop-types";

const initialState = {
  notification: {
    message: "",
    type: "",
    show: false,
  },
};

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return {
        ...state,
        notification: {
          ...action.payload,
          show: true,
        },
      };
    case "CLEAR_NOTIFICATION":
      return {
        ...state,
        notification: {
          message: "",
          type: "",
          show: false,
        },
      };
    default:
      return state;
  }
};

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const clearNotification = () => {
    dispatch({
      type: "CLEAR_NOTIFICATION",
    });
  };

  const setNotification = (notification) => {
    dispatch({
      type: "SET_NOTIFICATION",
      payload: notification,
    });

    setTimeout(() => {
      clearNotification();
    }, 3000);
  };

  return (
    <NotificationContext.Provider
      value={{
        notification: state.notification,
        setNotification,
        clearNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
