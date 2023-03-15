import { searchResolvers } from './../types.d';
import client from "../../client";

const resolvers: searchResolvers = {
  Query: {
    seeFollowers: async(_, {userName, page}, ) => {
      const ok = await client.user.findUnique({
        where: {userName},
        select: {id: true},
      });
      if (!ok) {
        return {
          ok: false,
          error: "User does not found"
        }
      }
      const followers = await client.user.findUnique({where: {
        userName,
      }}).followers({
        take: 5,
        skip: (page - 1) * 5,
      });
      const totalFollowers = await client.user.count({where: {following: {some: {userName}}}})
      return {
        ok: true,
        followers,
        totalPages: Math.ceil(totalFollowers / 5),
      }
    }
  }
}

export default resolvers;