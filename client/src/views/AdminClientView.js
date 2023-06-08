import React, { useContext } from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import { IoChevronBackOutline } from "react-icons/io5";

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
    <Container sx={{marginTop: "20px"}}>
      <Button href="/admin"><IoChevronBackOutline /> Back</Button>

      <Box sx={{display: "flex", justifyContent: "space-between"}}>
        <Box>
          <Typography variant="h5">{getUserById.fullname}</Typography>
          <Typography variant="caption">{getUserById.email}</Typography>
        </Box>

        <Box sx={{ textAlign: "right"}}>
          <Typography variant="h5">{user.fullname}</Typography>
          <Typography variant="caption">{user.email}</Typography>
        </Box>
      </Box>

      <MessageFeed messageParticipantId={clientId} />

      <AppBar position="fixed" sx={{ top: "auto", bottom: 0 }}>
        <ContactForm messageParticipantId={clientId} />
      </AppBar>
      <Toolbar />
    </Container>
  );
};

export default AdminClientView;
