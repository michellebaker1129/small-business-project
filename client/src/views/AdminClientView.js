import React, { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";

import { AuthContext } from "../context/authContext";

// get client id from useParams hook
// get admin id from useContext AuthContext (../context/authContext.js)
// get client info from graphql using a query that has safeguard
// TODO create new query 

const GET_USER_BY_ID = gql`
  query getUserById($clientId: ID!, $adminId: ID!) {
    getUserById(clientId: $clientId, adminId: $adminId) {
      id
      email
      fullname
    }
  }
`;

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
    </div>
  );
};

export default AdminClientView;
