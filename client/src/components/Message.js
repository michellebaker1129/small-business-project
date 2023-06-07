import React from "react";
import PropTypes from "prop-types";

const Message = ({ message }) => {
  return (
    <div>
      {/* TODO: maybe use typography from material-ui */}
      <p>{message.message}</p>
      <p>{message.sender.fullname}</p>
      <p>{message.receiver.fullname}</p>
      <p>{message.createdAt}</p>
    </div>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    sender: PropTypes.object.isRequired,
    receiver: PropTypes.object.isRequired,
    createdAt: PropTypes.string.isRequired
  }).isRequired
};

export default Message;