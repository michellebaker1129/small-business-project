import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { gql } from "graphql-tag";
import { useNavigate } from "react-router-dom";
import { Alert, Button, Container, Stack, TextField } from "@mui/material";

import { AuthContext } from "../context/authContext";
import { useForm } from "../hooks";

const REGISTER_USER = gql`
  mutation register(
    $registerInput: registerInput!
  ) {
    registerUser(
      registerInput: $registerInput
    ) {
      email
      token
    }
  }
`;

function Register() {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { registerUser: userData } }) {
      context.login(userData);
      navigate("/");
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: {
      registerInput: values,
    },
  });

  function registerUserCallback() {
    registerUser();
  }

  return (
    <Container spacing={2} maxWidth="sm">
      <h3>Register</h3>
      <Stack spacing={2} paddingBottom={2}>
        <TextField
          label="Email"
          name="email"
          type="email"
          onChange={onChange}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          onChange={onChange}
        />
        <TextField
          label="Confirm password"
          name="confirmPassword"
          type="password"
          onChange={onChange}
        />
      </Stack>
      {errors.length > 0 && errors.map((error) => (
        <Alert severity="error" key={error}>
          {error.message}
        </Alert>
      ))}
      <Button onClick={onSubmit} variant="contained">
        Register
      </Button>
    </Container>
  );
}

export default Register;
