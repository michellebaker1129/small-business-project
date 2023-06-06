import React, { useContext } from "react";
import PropTypes from "prop-types";
import { useQuery, gql } from "@apollo/client";
import { Stack } from "@mui/material";

import { AuthContext } from "../context/authContext";

import Message from "./Message";

const GET_ALL_POSTS = gql`
  query getAllPostsByConversationParticipantIds($userId: ID!, $secondUserId: ID!) {
    getAllPostsByConversationParticipantIds(userId: $userId, secondUserId: $secondUserId) {
      id
      receiverId
      senderId
      message
    }
  }
`;

const GET_USER_BY_ID = gql`
  query getUserById($clientId: ID!, $adminId: ID!) {
    getUserById(clientId: $clientId, adminId: $adminId) {
      id
      fullname
    }
  }
`;

const MessageFeed = ({ clientId }) => {
  const { user } = useContext(AuthContext);

  const { loading, error, data } = useQuery(GET_ALL_POSTS, {
    variables: { 
      userId: clientId,
      secondUserId: user.user_id,
    },
  });

  // get the client's data
  const { clientLoading, clientError, clientData } = useQuery(GET_USER_BY_ID, {
    variables: { 
      clientId,
      adminId: user.user_id, // TODO generalize this for all users
    },
  });

  if (loading || clientLoading) return <p>Loading...</p>;
  
  if (error) return <p>Error: {error.message}</p>;
  if (clientError) return <p>Error: {clientError.message}</p>;

  const { getAllPostsByConversationParticipantIds } = data;
  const { getUserById } = clientData || {};

  // map over posts and add sender and receiver info to each post

  return (
    <Stack>
      {getAllPostsByConversationParticipantIds.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </Stack>
  );
};

MessageFeed.propTypes = {
  clientId: PropTypes.string.isRequired
};

export default MessageFeed;