import React from "react";
import PropTypes from "prop-types";

const Message = ({ message }) => {
  return (
    <div>
      {/* TODO: maybe use typography from material-ui */}
      <p>{message.message}</p>
      <p>{message.senderId}</p>
      <p>{message.receiverId}</p>
      <p>{message.createdAt}</p>
    </div>
  );
};

Message.propTypes = {
  message: {
    id: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    senderId: PropTypes.string.isRequired,
    receiverId: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired
  }.isRequired
};

export default Message;