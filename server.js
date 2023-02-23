require("dotenv").config();
import { ApolloServer, gql } from "apollo-server";
import schema from "./schema";

const server = new ApolloServer({
  schema,
  context: {
    token: "1234"
  }
});

const PORT = process.env.PORT;

server.listen(PORT).then(() => console.log(`🚀Server is runnung on http://localhost:${PORT}`));