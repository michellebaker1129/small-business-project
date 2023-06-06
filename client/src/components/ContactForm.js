import React, { useState, useContext } from "react";
import PropTypes from "prop-types";
import { Alert, Button, Stack, TextField } from "@mui/material";
import { useMutation, gql } from "@apollo/client";

import { useForm } from "../hooks";
import { AuthContext } from "../context/authContext";
import { NotificationContext } from "../context/notificationContext";

const propTypes = {
  clientId: PropTypes.string.isRequired,
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
      receiverId
    }
  }
`;

function ContactForm({ clientId }) {
  const [errors, setErrors] = useState([]);
  const { user } = useContext(AuthContext);
  const { setNotification } = useContext(NotificationContext);

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
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: {
      messageInput: {
        message: values.message,
        senderId: clientId,
        receiverId: user.user_id,
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
    <Stack spacing={2}>
      <TextField
        label="Message"
        name="message"
        onChange={onChange}
        multiline
      />
      {errors.length > 0 && errors.map((error) => (
        <Alert severity="error" key={error}>
          {error.message}
        </Alert>
      ))}
      <Button onClick={submitForm} variant="contained">
        Send
      </Button>
    </Stack>
  );
}

ContactForm.propTypes = propTypes;

export default ContactForm;