import React from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Card,
  CardActionArea,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import { blue } from "@mui/material/colors";

import { GET_ALL_USERS } from "../graphql/queries";
import { getInitials } from "../utils/getInitials";
import useWindowDimensions from "../hooks/useWindowDimensions";

const AdminDashboardComponent = ({ user }) => {
  const navigate = useNavigate();
  const { width } = useWindowDimensions();

  // if the user is logged in and admin, show the admin dashboard
  // if the user is admin, requiest all clients via getAllUsers
  // useQuery hook with GET_ALL_USERS query
  const { loading, error, data } = useQuery(GET_ALL_USERS, {
    variables: { id: user.id },
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  const { getAllUsers } = data;

  const isMobile = width < 600;

  return (
    <Container>
      <h1>Admin Dashboard</h1>
      <Stack spacing={2} direction={isMobile ? "column" : "row"}>
        {getAllUsers.map((user) => (
          <Card
            key={user.id}
            sx={{
              padding: 2,
              backgroundColor: blue[100],
              width: isMobile ? "100%" : "170px",
            }}
          >
            <CardActionArea
              onClick={() => {
                // navigate to /admin/client/:clientId
                navigate(`/admin/client/${user.id}`);
              }}
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Avatar sx={{ bgcolor: blue[500] }}>
                  {getInitials(user.fullname)}
                </Avatar>
              </div>
              <div>
                <Typography variant="h6">{user.fullname}</Typography>
                <p>{user.email}</p>
              </div>
            </CardActionArea>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};

AdminDashboardComponent.propTypes = {
  user: PropTypes.object.isRequired,
};

export default AdminDashboardComponent;
