import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { setContext } from "@apollo/client/link/context";
import { createClient } from "graphql-ws";

import { GraphQLWsLink } from "@apollo/client/link/subscriptions";

const httpLink = createHttpLink({
  uri:
    process.env.REACT_APP_GRAPHQL_ENDPOINT || "http://localhost:3001/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const wsLink = new GraphQLWsLink(
  createClient({
    url: process.env.REACT_APP_WEBSOCKET_ENDPOINT || "ws://small-business-project.herokuapp.com/graphql",
    connectionParams: {
      authToken: localStorage.getItem("token"),
    },
    options: {
      reconnect: true,
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: authLink.concat(splitLink),
  cache: new InMemoryCache(),
});

export default client;
