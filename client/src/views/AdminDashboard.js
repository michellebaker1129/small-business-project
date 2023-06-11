import React, { useContext, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Card, CardActionArea } from "@mui/material";

import { AuthContext } from "../context/authContext";

import useRole from "../hooks/useRole";

const GET_ALL_USERS = gql`
  query getAllUsers($id: ID!) {
    getAllUsers(id: $id) {
      id
      email
      fullname
      username
    }
  }
`;

const AdminDashboard = () => {
  // if the user is not logged in, redirect to /login
  const { user } = useContext(AuthContext);
  const { isAdmin, isClient, isLoggedOut } = useRole();
  const navigate = useNavigate();

  // if (!user || isLoggedOut) {
  //   navigate("/login");
  //   return null;
  // }
  

  // // if the user is logged in, but not admin, redirect to /client
  // if (isClient) {
  //   return redirect("/client");
  // }

  // if the user is logged in and admin, show the admin dashboard
  // if the user is admin, requiest all clients via getAllUsers
  // useQuery hook with GET_ALL_USERS query
  const { loading, error, data } = useQuery(GET_ALL_USERS, {
    variables: { id: user.user_id },
  });

  if (loading) return <p>Loading...</p>;
  
  if (error) return <p>Error: {error.message}</p>;

  const { getAllUsers } = data;
  
  return (
    <div>
      <h1>Admin Dashboard</h1>
      {getAllUsers.map(user => (
        <Card key={user.id}>
          <CardActionArea onClick={() => {
            // navigate to /admin/client/:clientId
            navigate(`/admin/client/${user.id}`);
          }}>
            <p>{user.fullname}</p>
            <p>{user.email}</p>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
};

export default AdminDashboard;