import React from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { Card, CardActionArea } from "@mui/material";
import PropTypes from "prop-types";

import { GET_ALL_USERS } from "../graphql/queries";

const AdminDashboardComponent = ({ user }) => {
  const navigate = useNavigate();
  // if the user is logged in and admin, show the admin dashboard
  // if the user is admin, requiest all clients via getAllUsers
  // useQuery hook with GET_ALL_USERS query
  const { loading, error, data } = useQuery(GET_ALL_USERS, {
    variables: { id: user.id },
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  const { getAllUsers } = data;

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {getAllUsers.map((user) => (
        <Card key={user.id}>
          <CardActionArea
            onClick={() => {
              // navigate to /admin/client/:clientId
              navigate(`/admin/client/${user.id}`);
            }}
          >
            <p>{user.fullname}</p>
            <p>{user.email}</p>
          </CardActionArea>
        </Card>
      ))}
    </div>
  );
};

AdminDashboardComponent.propTypes = {
  user: PropTypes.object.isRequired,
};

export default AdminDashboardComponent;
