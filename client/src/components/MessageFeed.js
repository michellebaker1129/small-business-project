import React, { useMemo, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useQuery, useSubscription, gql } from "@apollo/client";
import { Box, Stack } from "@mui/material";
import { blue } from "@mui/material/colors";
import { MdMessage } from "react-icons/md";

import { AuthContext } from "../context/authContext";
import {
  GET_ALL_POSTS_BY_CLIENT_ID,
  NEW_MESSAGE_SUBSCRIPTION,
} from "../graphql/queries";

import { USER_ROLES } from "../utils/constants";

import Message from "./Message";

const MessageFeed = ({ messageParticipant }) => {
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);

  if (!user) return null;

  const clientId =
    user.role === USER_ROLES.ADMIN ? messageParticipant.id : user.user_id;

  // subscribe to new messages
  const { data: newMessageData } = useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
    variables: { clientId },
  });

  const { loading, error, data } = useQuery(GET_ALL_POSTS_BY_CLIENT_ID, {
    variables: {
      clientId,
    },
  });

  const { getAllPostsByClientId } = data || {};

  // add query results to messages array
  useEffect(() => {
    if (getAllPostsByClientId) {
      setMessages(getAllPostsByClientId);
    }
  }, [getAllPostsByClientId]);

  // add new message to messages array
  useEffect(() => {
    if (newMessageData) {
      setMessages((prev) => [...prev, newMessageData.messageSent]);
    }
  }, [newMessageData]);

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  if (messages.length === 0) {
    return (
      <Box
        style={{
          textAlign: "center",
          padding: "3rem 0",
          border: "1px dashed #ccc",
          fontStyle: "italic",
          borderRadius: "10px",
          maxWidth: "50vw",
          margin: "1rem auto",
          color: blue[300],
          marginBottom: "5rem",
        }}
      >
        <p style={{ fontSize: "10rem", margin: 0, color: blue[100] }}>
          <MdMessage />
        </p>
        No messages yet. Send the first message!
      </Box>
    );
  }

  return (
    <Stack spacing={1} sx={{ marginBottom: "50px" }}>
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </Stack>
  );
};

MessageFeed.propTypes = {
  messageParticipant: PropTypes.object.isRequired,
};

export default MessageFeed;
