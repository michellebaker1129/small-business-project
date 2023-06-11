import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Container, Stack, TextField } from "@mui/material";

import { AuthContext } from "../context/authContext";
import { useForm } from "../hooks";
import { USER_ROLES } from "../utils/constants";

const LOGIN_USER = gql`
  mutation login(
    $loginInput: loginInput!
  ) {
    loginUser(
      loginInput: $loginInput
    ) {
      email
      role
      token
    }
  }
`;

function Login() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: "",
    password: "",
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { loginUser: userData } }) {
      context.login(userData);
      // if admin, navigate to admin page
      // if (userData.role === USER_ROLES.ADMIN) {
      //   navigate("/admin");
      // } else {
      //   navigate("/");
      // }
      navigate("/");
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: {
      loginInput: values,
    },
  });

  function loginUserCallback() {
    loginUser();
  }

  return (
    <Container spacing={2} maxWidth="sm">
      <h3>Login</h3>
      <Stack spacing={2} paddingBottom={2}>
        <TextField
          label="Email"
          name="email"
          type="email"
          onChange={onChange}
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          onChange={onChange}
          required
        />
      </Stack>
      {errors.length > 0 && errors.map((error) => (
        <Alert severity="error" key={error}>
          {error.message}
        </Alert>
      ))}
      <Button onClick={onSubmit} variant="contained">
        Login
      </Button>
    </Container>
  );
}

export default Login; 
