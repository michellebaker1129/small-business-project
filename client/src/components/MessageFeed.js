import React, { useMemo, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useQuery, useSubscription, gql } from "@apollo/client";
import { Box, Stack } from "@mui/material";
import { blue } from "@mui/material/colors";
import { MdMessage } from "react-icons/md";

import { AuthContext } from "../context/authContext";

import { USER_ROLES } from "../utils/constants";

import Message from "./Message";

// TODO getUserById needs to handle all admins

const GET_ALL_POSTS_BY_CLIENT_ID = gql`
  query getAllPostsByClientId($clientId: ID!) {
    getAllPostsByClientId(clientId: $clientId) {
      id
      receiverId
      receiverFullname
      senderId
      senderFullname
      message
      createdAt
    }
  }
`;

// set up subscription to listen for new messages
const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription messageSent($receiverId: ID!) {
    messageSent(receiverId: $receiverId) {
      id
      receiverId
      receiverFullname
      senderId
      senderFullname
      message
      createdAt
    }
  }
`;

const MessageFeed = ({ messageParticipant }) => {
  const [messages, setMessages] = useState([]);
  const { user } = useContext(AuthContext);

  if (!user) return null;

  let clientId = null;
  let adminId = null;
  let userIsAdmin = user.role === USER_ROLES.ADMIN;

  if (userIsAdmin) {
    clientId = messageParticipant.id;
    adminId = user.user_id;
  }

  if (!userIsAdmin) {
    clientId = user.user_id;
    adminId = messageParticipant.id;
  }

  // subscribe to new messages
  const { data: newMessageData } = useSubscription(NEW_MESSAGE_SUBSCRIPTION, {
    variables: { receiverId: clientId },
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
        No messages yet. Add the first message to {messageParticipant.fullname}!
      </Box>
    );
  }

  return (
    <Stack spacing={1}>
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
