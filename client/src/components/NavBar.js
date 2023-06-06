import React, { useContext } from "react";
import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/authContext";

function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              Home
            </Link>
          </Typography>
          <Box alignItems="right" sx={{ flexGrow: 1, textAlign: "right" }}>
            {user ? (
              <>
                <Button onClick={onLogout} style={{ color: "white" }}>Logout</Button>
              </>
            ) : (
              <>
                <Link to="/login" style={{ textDecoration: "none", color: "white", marginRight: 10 }}>Login</Link>
                <Link to="/register" style={{ textDecoration: "none", color: "white" }}>Register</Link>
              </>
            )}
          </Box>
          {/* TODO maybe use <Avatar /> (will need image) */}
        </Toolbar>
      </AppBar>
    </Box >
  );
}

export default NavBar;
