import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { createServer } from 'http';
import express from 'express';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from "dotenv/config";

import {resolvers} from './graphql/resolvers.js';
import {typeDefs} from './models/typeDefs.js';

// Create the schema, which will be used separately by ApolloServer and
// the WebSocket server.
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create an Express app and HTTP server; we will attach both the WebSocket
// server and the ApolloServer to this HTTP server.
const app = express();
const httpServer = createServer(app);

await mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Db Connected`);
  })
  .catch(err => {
    console.log(err.message);
  });

const findUser = async (authToken) => {
  // TODO Find a user by their auth token
};

const getDynamicContext = async (ctx, msg, args) => {
  if (ctx.connectionParams.authentication) {
    const currentUser = await findUser(ctx.connectionParams.authentication);
    return { currentUser };
  }
  // Let the resolvers know we don't have a current user so they can
  // throw the appropriate error
  return { currentUser: null };
};

// Create our WebSocket server using the HTTP server we just set up.
const wsServer = new WebSocketServer({
  server: httpServer,
  path: '/graphql',
  context: async (ctx, msg, args) => {
    // This will be run every time the client sends a subscription request
    return getDynamicContext(ctx, msg, args);
  },
  onConnect: async (ctx) => {
    if (tokenIsNotValid(ctx.connectionParams)) {
      throw new Error("Not authorized");
    }
  },
  onDisconnect(ctx, code, reason) {
    console.log('Disconnected!');
  },

});
// Save the returned server's info so we can shutdown this server later
const serverCleanup = useServer({ schema }, wsServer);

// Set up ApolloServer.
const server = new ApolloServer({
  schema,
  plugins: [
    // Proper shutdown for the HTTP server.
    ApolloServerPluginDrainHttpServer({ httpServer }),

    // Proper shutdown for the WebSocket server.
    {
      async serverWillStart() {
        return {
          async drainServer() {
            await serverCleanup.dispose();
          },
        };
      },
    },
  ],
});

await server.start();
app.use('/graphql', cors(), bodyParser.json(), expressMiddleware(server));

const PORT = 4000;
// Now that our HTTP server is fully set up, we can listen to it.
httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/graphql`);
});
