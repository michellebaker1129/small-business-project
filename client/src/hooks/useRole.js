import { useContext } from "react";

import { USER_ROLES } from "../utils/constants";

import { AuthContext } from "../context/authContext";

const useRole = () => {
  const { user } = useContext(AuthContext);
  const { role } = user || {};

  return {
    isAdmin: user && role && role === USER_ROLES.ADMIN,
    isClient: user && role && role === USER_ROLES.CLIENT,
    isLoggedOut: !user,
  };
};

export default useRole;