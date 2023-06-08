import React, { useReducer, createContext } from "react";
import PropTypes from "prop-types";

const initialState = {
  messages: [],
};

const messageReducer = (state, action) => {
  switch (action.type) {
    case "ADD_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    case "REPLACE_MESSAGES":
      return {
        ...state,
        messages: action.payload,
      };
    default:
      return state;
  }
};

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, initialState);

  const addMessage = (message) => {
    dispatch({
      type: "ADD_MESSAGE",
      payload: message,
    });
  };

  const replaceMessages = (messages) => {
    dispatch({
      type: "REPLACE_MESSAGES",
      payload: messages,
    });
  };

  return (
    <MessageContext.Provider
      value={{
        messages: state.messages,
        addMessage,
        replaceMessages,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

MessageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
