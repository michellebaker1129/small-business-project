import React, { useContext } from "react";

import useRole from "../hooks/useRole";
import { AuthContext } from "../context/authContext";

function Home() {
  const { isAdmin, isClient, isLoggedOut } = useRole();

  return (
    <div>
      <h1>Home Page</h1>
      {isAdmin && <h2>Admin</h2>}

      {isClient && <h2>Client</h2>}

      {isLoggedOut && <h2>Logged Out</h2>}
    </div>
  );
}

export default Home;
