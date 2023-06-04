import React, { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

import { AuthContext } from "../context/authContext";

import ContactForm from "../components/ContactForm";

// get client id from useParams hook
// get admin id from useContext AuthContext (../context/authContext.js)
// get client info from graphql using a query that has safeguard
const GET_USER_BY_ID = gql`
  query getUserById($clientId: ID!, $adminId: ID!) {
    getUserById(clientId: $clientId, adminId: $adminId) {
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
    variables: { adminId: user.user_id, clientId },
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

      <ContactForm clientId={clientId} />
    </div>
  );
};

export default AdminClientView;
