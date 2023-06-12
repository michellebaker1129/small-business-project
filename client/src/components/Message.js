import React, { useContext } from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import TimeAgo from "javascript-time-ago";
import { Avatar, Box, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

import { AuthContext } from "../context/authContext";
import { USER_ROLES } from "../utils/constants";

const Message = ({ message }) => {
  const { user } = useContext(AuthContext);
  const timeAgo = new TimeAgo("en-US");
  const date = new Date(message.createdAt);
  const formattedDate = dayjs(date).format("DD/MM/YYYY HH:mm:ss");

  // get initials from fullname
  const getInitials = (fullname) => {
    const names = fullname.split(" ");
    let initials = "";
    names.forEach((name) => {
      initials += name.charAt(0);
    });
    return initials.toUpperCase();
  };

  const showRecipient = user.id !== message.receiverId;
  const recipientMarkup = showRecipient ? (
    <div>
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        &nbsp;: {message.receiverFullname}
      </Typography>
    </div>
  ) : null;

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        padding: "10px",
        display: "flex",
        borderRadius: "6px",
      }}
    >
      <Avatar sx={{ bgcolor: blue[500] }}>
        {getInitials(message.senderFullname)}
      </Avatar>
      <div style={{ marginLeft: "10px", flex: 1 }}>
        <div style={{ display: "flex" }}>
          <Typography variant="body1" sx={{ fontWeight: "bold" }}>
            {message.senderFullname}
          </Typography>
          {recipientMarkup}
        </div>
        <Typography variant="body1">{message.message}</Typography>
        <div style={{ textAlign: "right", color: "#777" }}>
          <Typography title={formattedDate} variant="caption">
            {timeAgo.format(date)}
          </Typography>
        </div>
      </div>
    </Box>
  );
};

Message.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    senderId: PropTypes.string.isRequired,
    senderFullname: PropTypes.string.isRequired,
    receiverId: PropTypes.string.isRequired,
    receiverFullname: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default Message;
