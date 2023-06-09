import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Alert, Button, Stack, TextField } from "@mui/material";
import { useMutation, gql } from "@apollo/client";
import { blue } from "@mui/material/colors";
import { IoSendSharp } from "react-icons/io5";

import { useForm } from "../hooks";
import { AuthContext } from "../context/authContext";
import { NotificationContext } from "../context/notificationContext";
import { MessageContext } from "../context/messageContext";

const propTypes = {
  messageParticipant: PropTypes.object.isRequired,
};

const SEND_MESSAGE = gql`
  mutation sendMessage(
    $messageInput: messageInput!
  ) {
    sendMessage(
      messageInput: $messageInput
    ) {
      id
      message
      createdAt
      senderId
      senderFullname
      receiverId
      receiverFullname
    }
  }
`;

function ContactForm({ messageParticipant }) {
  const [errors, setErrors] = useState([]);
  const { user } = useContext(AuthContext);
  const { setNotification } = useContext(NotificationContext);
  const { addMessage } = useContext(MessageContext);

  // TODO handle images
  const { onChange, onSubmit, values, clearForm } = useForm(handleSubmit, {
    message: "",
  });

  const [sendMessage, { loading }] = useMutation(SEND_MESSAGE, {
    update(_, { data: { sendMessage: messageData } }) {
      setNotification({
        type: "success",
        message: "Message sent successfully",
      });
      addMessage(messageData);
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: {
      messageInput: {
        message: values.message,
        senderId: user.user_id,
        receiverId: messageParticipant.id,
      },
    },
  });

  function handleSubmit() {
    sendMessage();
  }

  function submitForm(e) {
    onSubmit(e);

    // TODO get this to work
    clearForm();
  }

  return (
    <>
      {errors.length > 0 && errors.map((error) => (
        <Alert severity="error" key={error}>
          {error.message}
        </Alert>
      ))}
      <Stack sx={{ bgcolor: blue[50], padding: "10px" }} spacing={2} direction="row">
        <TextField
          label="Message"
          name="message"
          onChange={onChange}
          sx={{ flex: 1 }}
          multiline
        />
        <Button onClick={submitForm} variant="contained">
          Send <span style={{marginLeft: "10px", fontSize: "1rem"}}><IoSendSharp /></span>
        </Button>
      </Stack>
    </>
  );
}

ContactForm.propTypes = propTypes;

export default ContactForm;