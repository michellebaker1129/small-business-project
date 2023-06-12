import React, { useContext } from "react";
import { Container } from "@mui/material";

import { AuthContext } from "../context/authContext";

import AdminDashboardComponent from "../components/AdminDashboardComponent";

// TODO get more info from users
// TODO add pagination

const AdminDashboard = () => {
  // if the user is not logged in, redirect to /login
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Container>Loading...</Container>;
  }

  return <AdminDashboardComponent user={user} />;
};

export default AdminDashboard;
