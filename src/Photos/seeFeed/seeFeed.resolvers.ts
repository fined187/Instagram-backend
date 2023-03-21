import client from "../../client";
import { protectedResolver } from "../../Users/users.utils";

export default {
  Query: {
    seeFeed: protectedResolver(async(_, __, {loggedInUser}) => client.photo.findMany({
      where: {
        OR: [
          {
            user: {
              followers: {
                some: {
                  id: loggedInUser.id,
                },
              },
            },
          },
          {
            userId: loggedInUser.id,
          }
        ] 
      },
      orderBy: {
        createdAt: "desc",
      },
    })),
  }
}