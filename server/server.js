const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const mongoose = require("mongoose");
require("dotenv").config();

const { resolvers } = require("./graphql/resolvers.js");
const { typeDefs } = require("./models/typeDefs.js");

const server = new ApolloServer({ typeDefs, resolvers });

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Db Connected");

    startStandaloneServer(server, {
      listen: { port: process.env.PORT || 4000 },
    }).then(({ url }) => {
      console.log(`Server ready at ${url}`);
    });
  })
  .catch(err => {
    console.log(err.message);
  });
