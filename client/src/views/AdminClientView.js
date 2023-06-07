import React, { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { AppBar, Toolbar } from "@mui/material";

import { AuthContext } from "../context/authContext";
import { USER_ROLES } from "../utils/constants";

import ContactForm from "../components/ContactForm";
import MessageFeed from "../components/MessageFeed";

// get client id from useParams hook
// get admin id from useContext AuthContext (../context/authContext.js)
// get client info from graphql using a query that has safeguard
const GET_USER_BY_ID = gql`
  query getUserById($clientId: ID!, $adminId: ID!, $userIsAdmin: Boolean!) {
    getUserById(clientId: $clientId, adminId: $adminId, userIsAdmin: $userIsAdmin) {
      id
      email
      fullname
    }
  }
`;

// TODO render messages that were sent to the client or received from the client
// TODO create query that will handle the messages fetching
// - query will have a safeguard that will check if the user is admin or client

const AdminClientView = () => {
  const { clientId } = useParams();
  const { user } = useContext(AuthContext);

  const { loading, error, data } = useQuery(GET_USER_BY_ID, {
    variables: { adminId: user.user_id, clientId, userIsAdmin: user.role === USER_ROLES.ADMIN },
  });

  if (loading) return <p>Loading...</p>;
  
  if (error) return <p>Error: {error.message}</p>;

  const { getUserById } = data;
  
  // render client info
  return (
    <div>
      <h1>Client Info</h1>
      <p>{getUserById.id}</p>
      <p>{getUserById.fullname}</p>
      <p>{getUserById.email}</p>

      <MessageFeed messageParticipantId={clientId} />

      <AppBar position="fixed" sx={{ top: "auto", bottom: 0 }}>
        <ContactForm messageParticipantId={clientId} />
      </AppBar>
      <Toolbar />
    </div>
  );
};

export default AdminClientView;
