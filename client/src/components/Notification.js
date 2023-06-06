import React, { useContext } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

import { NotificationContext } from "../context/notificationContext";

// TODO set up a useEffect to listen for changes to notification, and trigger the snackbar when it changes
// TODO use this component in App.js

function Notification () {
  const { notification, clearNotification } = useContext(NotificationContext);
  const { message, type, show } = notification;

  if (!show) return null;

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={show} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
        <MuiAlert onClose={clearNotification} severity={type}>
          {message}
        </MuiAlert>
      </Snackbar>
    </Stack>
  );
}

export default Notification;