import client from "../../client";
import { protectedResolver } from "../../Users/users.utils";

export default {
  Query: {
    seeRooms: protectedResolver(async(_, __, {loggedInUser}) => 
      await client.room.findMany({
        where: {
          users: {
            some: {
              id: loggedInUser.id,
            },
          },
        },
      })
    ),
  },
};