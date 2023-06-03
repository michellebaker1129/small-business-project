import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h1>Home Page</h1>
      {user ? (
        <></>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Home;
