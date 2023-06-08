import React, { useMemo, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import { useQuery, gql } from "@apollo/client";
import { Box, Stack } from "@mui/material";
import { blue } from "@mui/material/colors";
import { MdMessage } from "react-icons/md";

import { AuthContext } from "../context/authContext";
import { MessageContext } from "../context/messageContext";

import { USER_ROLES } from "../utils/constants";

import Message from "./Message";

const COMBINED_QUERY = gql`
  query combinedQuery($clientId: ID!, $adminId: ID!, $userIsAdmin: Boolean!) {
    getAllPostsByConversationParticipantIds(clientId: $clientId, adminId: $adminId) {
      id
      receiverId
      senderId
      message
      createdAt
    }
    getUserById(clientId: $clientId, adminId: $adminId, userIsAdmin: $userIsAdmin) {
      id
      fullname
    }
  }
`;

const MessageFeed = ({ messageParticipantId }) => {
  const { user } = useContext(AuthContext);
  const { messages, replaceMessages } = useContext(MessageContext);
  
  if (!user) return null;

  let clientId = null;
  let adminId = null;
  let userIsAdmin = user.role === USER_ROLES.ADMIN;

  if (userIsAdmin) {
    clientId = messageParticipantId;
    adminId = user.user_id;
  }

  if (!userIsAdmin) {
    clientId = user.user_id;
    adminId = messageParticipantId;
  }

  const { loading, error, data } = useQuery(COMBINED_QUERY, {
    variables: { 
      clientId,
      adminId,
      userIsAdmin,
    },
  });

  const { getAllPostsByConversationParticipantIds, getUserById } = data || {};

  // update messages in context
  useEffect(() => {
    if (getAllPostsByConversationParticipantIds && messages.length === 0) {
      replaceMessages(getAllPostsByConversationParticipantIds);
    }
  }, [messages, getAllPostsByConversationParticipantIds]);

  const messagesToRender = useMemo(() => {
    // if messages has more data, use it for rendering, otherwise use data from query
    if (!messages && !getAllPostsByConversationParticipantIds) {
      return [];
    }

    if (messages && !getAllPostsByConversationParticipantIds) {
      return messages;
    }

    if (!messages && getAllPostsByConversationParticipantIds) {
      return getAllPostsByConversationParticipantIds;
    }
    
    // if (messages || getAllPostsByConversationParticipantIds) {
    //   if (messages.length > getAllPostsByConversationParticipantIds.length) {
    //     return messages;
    //   }
    // }
  }, [messages, getAllPostsByConversationParticipantIds]);

  if (loading) return <p>Loading...</p>;
  
  if (error) return <p>Error: {error.message}</p>;

  if (messagesToRender.length === 0) {
    return <Box style={{
      textAlign: "center",
      padding: "3rem 0",
      border: "1px dashed #ccc",
      fontStyle: "italic",
      borderRadius: "10px",
      maxWidth: "50vw",
      margin: "1rem auto",
      color: blue[300],
      marginBottom: "5rem"
    }}>
      <p style={{ fontSize: "10rem", margin: 0, color: blue[100]}}><MdMessage /></p>
      No messages yet. Add the first message to {getUserById.fullname}!
    </Box>;
  }

  // map over posts and add sender and receiver info to each post
  const posts = messagesToRender.map((post) => {
    const newPost = { ...post };
    if (newPost.senderId === clientId) {
      newPost.sender = getUserById;
      newPost.receiver = user;
    } else if (newPost.senderId === adminId) {
      newPost.sender = user;
      newPost.receiver = getUserById;
    }
    return newPost;
  });

  return (
    <Stack spacing={1}>
      {posts.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </Stack>
  );
};

MessageFeed.propTypes = {
  messageParticipantId: PropTypes.string.isRequired
};

export default MessageFeed;