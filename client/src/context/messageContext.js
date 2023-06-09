import React, { useReducer, createContext } from "react";
import PropTypes from "prop-types";

const initialState = {
  recipient: {
    id: "",
    fullname: "",
  },
};

const messageReducer = (state, action) => {
  switch (action.type) {
    case "ADD_RECIPIENT":
      return {
        ...state,
        recipient: action.payload,
      };
    default:
      return state;
  }
};

export const MessageContext = createContext();

export const MessageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, initialState);

  const addRecipient = (recipient) => {
    dispatch({
      type: "ADD_RECIPIENT",
      payload: recipient,
    });
  };

  return (
    <MessageContext.Provider
      value={{
        recipient: state.recipient,
        addRecipient,
      }}
    >
      {children}
    </MessageContext.Provider>
  );
};

MessageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
