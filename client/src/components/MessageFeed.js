import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useQuery, gql } from "@apollo/client";
import { Stack } from "@mui/material";

import { AuthContext } from "../context/authContext";

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

  if (loading) return <p>Loading...</p>;
  
  if (error) return <p>Error: {error.message}</p>;

  const { getAllPostsByConversationParticipantIds, getUserById } = data;

  // map over posts and add sender and receiver info to each post
  const posts = getAllPostsByConversationParticipantIds.map((post) => {
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
    <Stack>
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