import { ApolloServer } from "@apollo/server";
// import { expressMiddleware } from "@apollo/server/express4";
// import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
// import { createServer } from "http";
import express from "express";
// import { makeExecutableSchema } from "@graphql-tools/schema";
// import { WebSocketServer } from "ws";
// import { useServer } from "graphql-ws/lib/use/ws";
// import bodyParser from "body-parser";
// import cors from "cors";
// import mongoose from "mongoose";
import "dotenv/config";

import { resolvers, typeDefs } from "./graphql/";
// import { typeDefs } from "./models/typeDefs.js";

import db from "./config/connection.js";
import { authMiddleware } from "./utils/auth.js";
import * as path from "path";
const PORT = process.env.PORT || 3001;


// Create the schema, which will be used separately by ApolloServer and
// the WebSocket server.
// const schema = makeExecutableSchema({ typeDefs, resolvers });

// Create an Express app and HTTP server; we will attach both the WebSocket
// server and the ApolloServer to this HTTP server.
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// const httpServer = createServer(app);
// const corsOptions = {
//   origin: true,
// };

// app.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://small-business-project-client.herokuapp.com"
//   );
//   res.header("Access-Control-Request-Headers", "Content-Type, Authorization");
//   res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });

// app.options("/*", (_, res) => {
//   res.sendStatus(200);
// });

// await mongoose
//   .connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => {
//     console.log(`Db Connected`);
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// // Create our WebSocket server using the HTTP server we just set up.
// const wsServer = new WebSocketServer({
//   server: httpServer,
//   path: "/graphql",
// });
// // Save the returned server's info so we can shutdown this server later
// const serverCleanup = useServer({ schema }, wsServer);

// Set up ApolloServer.
// const server = new ApolloServer({
//   schema,
//   plugins: [
//     // Proper shutdown for the HTTP server.
//     ApolloServerPluginDrainHttpServer({ httpServer }),

//     // Proper shutdown for the WebSocket server.
//     {
//       async serverWillStart() {
//         return {
//           async drainServer() {
//             await serverCleanup.dispose();
//           },
//         };
//       },
//     },
//   ],
// });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

// await server.start();
// app.use(
//   "/graphql",
//   cors(corsOptions),
//   bodyParser.json(),
//   expressMiddleware(server)
// );

// const PORT = process.env.PORT || 4000;
// // Now that our HTTP server is fully set up, we can listen to it.
// httpServer.listen(PORT, () => {
//   console.log(`Server is now running on http://localhost:${PORT}/graphql`);
// });

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

const startApolloServer = async () => {
  // This line starts the Apollo Server. The start() method initializes the server and prepares it to handle GraphQL requests.
  await server.start();
  //This line applies the Apollo Server middleware to the app object. It integrates the Apollo Server functionality with an existing Express.js application (app). By applying the middleware, the server can handle GraphQL requests through the specified route.
  server.applyMiddleware({ app });
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};

// Call the async function to start the server
startApolloServer();
