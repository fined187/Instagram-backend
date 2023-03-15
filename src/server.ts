require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./Users/users.utils";
import express from "express";
import client from "./client";

const PORT = process.env.PORT;
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
      return {
        loggedInUser: await getUser(req.headers.token),
        client,
      };
    },
  });
  const app = express();
  apollo.applyMiddleware({ app });
  app.listen({ port: PORT }, () => {
    console.log(`🚀Server is running on http://localhost:${PORT}/graphql ✅`);
  });
