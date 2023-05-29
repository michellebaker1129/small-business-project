import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer'
import * as dotenv from 'dotenv'
dotenv.config();

import express from 'express';
import http from 'http';
import cors from 'cors';
import bodyParser from 'body-parser';

import { typeDefs } from './schema/typeDef.js';
import { resolvers } from './schema/resolvers.js';
import connectDB from './config/connection.js';

const app = express();
const httpServer = http.createServer(app);
const PORT = 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await connectDB();
await server.start();

app.use(
  cors(),
  bodyParser.json(),
  expressMiddleware(server),
);

await new Promise((resolve) => httpServer.listen({ port: PORT }, resolve));
console.log(`🚀 Server ready at http://localhost:${PORT}`);
