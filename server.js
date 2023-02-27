require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema.js";
import { getUser } from "./Users/users.utils.js";
import { graphqlUploadExpress } from "graphql-upload/graphqlUploadExpress.mjs";
import express from "express";

const PORT = process.env.PORT;
const startServer = async() => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
      return {
        loggedInUser: await getUser(req.headers.token),
      }
    }
  });
  await server.start();
  const app = express();
  app.use(graphqlUploadExpress());
  server.applyMiddleware({app});
  await new Promise((func) => app.listen({port: PORT}, func));
  console.log(`🚀Server is runnung on http://localhost:${PORT}`)
}

startServer();

