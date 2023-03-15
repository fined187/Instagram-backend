import client from "../../client";
import { searchResolvers } from "../types";

const resolvers: searchResolvers = {
  Query: {
    seeFollowing: async(_, {userName, lastId}) => {
      const ok = await client.user.findUnique({
        where: {userName},
        select: {id: true},
      });
      if (!ok) {
        return {
          ok: false,
          error: "User does not found"
        };
      }
      const following = await client.user.findUnique({where: {
        userName,
      }}).following({
        take: 5,
        skip: lastId ? 1 : 0,
        ...(lastId && {cursor: {id: lastId}}),
      });
      return {
        ok: true,
        following,
      };
    },
  },
};

export default resolvers;