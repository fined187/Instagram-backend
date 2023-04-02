require("dotenv").config();
import { ApolloServer, ExpressContext } from "apollo-server-express";
import { getUser } from "./Users/users.utils";
import express, {Express} from "express";
import {graphqlUploadExpress} from "graphql-upload";
import pubsub from "./Pubsub";
import { createServer, Server } from "http";
import { SubscriptionServer } from "subscriptions-transport-ws";
import {execute, subscribe} from "graphql";
import schema from "./schema"
import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core";

  const PORT = process.env.PORT;
  
  const startServer = async () => {
    const app: Express = express();
    app.use(graphqlUploadExpress());
    // app.use("../uploads", express.static("uploads"));
    
    const httpServer: Server = createServer(app);
    const subscriptionServer: SubscriptionServer = SubscriptionServer.create({
      schema,
      execute,
      subscribe
    }, {server: httpServer, path: "/graphql"});
    
    const apollo: ApolloServer = new ApolloServer({
      schema,
      context: async ({req}) => {
        return {
          loggedInUser: await getUser(req.headers.token),
        };
      },
      plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground,
        {
          async serverWillStart() {
            return {
              async drainServer() {
                subscriptionServer.close();
              },
            };
          },
        },
      ],
    });
    await apollo.start();
    apollo.applyMiddleware({ app });
    httpServer.listen(process.env.PORT, () => console.log(`🚀Server is running on http://localhost:${PORT}/graphql ✅`));
  };

startServer();
