require("dotenv").config();
import { ApolloServer } from "apollo-server-express";
import { typeDefs, resolvers } from "./schema.js";
import { getUser } from "./Users/users.utils.js";
import express from "express";
import logger from "morgan";

const PORT = process.env.PORT;
  const apollo = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
      return {
        loggedInUser: await getUser(req.headers.token),
      };
    },
  });
  const app = express();
  apollo.applyMiddleware({ app });
  app.use("/static", express.static("uploads"));
  app.listen({ port: PORT }, () => {
    console.log(`🚀Server is running on http://localhost:${PORT}/graphql ✅`);
  });
