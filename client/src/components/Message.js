import React from "react";
import PropTypes from "prop-types";
import dayjs from "dayjs";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { Avatar, Box, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

TimeAgo.addDefaultLocale(en);

const Message = ({ message }) => {
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

  return (
    <Box sx={{ border: "1px solid #ccc", padding: "10px", display: "flex", borderRadius: "6px"}}>
      <Avatar sx={{ bgcolor: blue[500]}}>
        {getInitials(message.sender.fullname)}
      </Avatar>
      <div style={{ marginLeft: "10px", flex: 1}}>
        <Typography variant="body1" sx={{fontWeight: "bold"}}>
          {message.sender.fullname}
        </Typography>
        <Typography variant="body1">
          {message.message}
        </Typography>
        <div style={{ textAlign: "right", color: "#777"}}>
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
    sender: PropTypes.object.isRequired,
    receiver: PropTypes.object.isRequired,
    createdAt: PropTypes.string.isRequired
  }).isRequired
};

export default Message;