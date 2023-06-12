import React, { useContext } from "react";
import { AppBar, Toolbar } from "@mui/material";
import Container from "@mui/material/Container";

import { AuthContext } from "../context/authContext";
import { MessageContext } from "../context/messageContext";
import { GET_ALL_POSTS_BY_CLIENT_ID } from "../graphql/queries";

import MessageFeed from "../components/MessageFeed";
import ContactForm from "../components/ContactForm";

const ClientDashboard = () => {
  const { user } = useContext(AuthContext);
  const { recipient } = useContext(MessageContext);

  if (!recipient || !user) return <div>Loading...</div>;

  return (
    <div>
      <h1>Client Dashboard</h1>

      <Container>
        <MessageFeed messageParticipant={recipient} />
      </Container>

      <AppBar position="fixed" sx={{ top: "auto", bottom: 0 }}>
        <ContactForm messageParticipant={recipient} />
      </AppBar>
    </div>
  );
};

export default ClientDashboard;
