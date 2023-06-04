import React, { useContext } from "react";
import { useQuery, gql } from "@apollo/client";

import { AuthContext } from "../context/authContext";

import useRole from "../hooks/useRole";

// TODO get more info from users
const GET_ALL_USERS = gql`
  query getAllUsers($id: ID!) {
    getAllUsers (id: $id) {
      id
      email
    }
  }
`;

const AdminDashboard = () => {
  const { isAdmin, isClient, isLoggedOut } = useRole();
  const { user } = useContext(AuthContext);

  if (!user || isLoggedOut) return <p>Not logged in</p>; // TODO handle logged out

  // if the user is admin, requiest all clients via getAllUsers
  // useQuery hook with GET_ALL_USERS query
  const { loading, error, data } = useQuery(GET_ALL_USERS, {
    variables: { id: user.user_id },
  });
  const { getAllUsers } = data || { getAllUsers: [] };

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  console.log(getAllUsers);
  
  return (
    <div>
      <h1>Admin Dashboard</h1>
      {!loading && !error && getAllUsers.map(user => (
        <div key={user.id}>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default AdminDashboard;