import client from "../../client";
import { protectedResolver } from "../../Users/users.utils";

export default {
  Query: {
    seeRoom: protectedResolver((_, {id}, {loggedInUser}) => client.room.findFirst({
      where: {
        id,
        users: {
          some: {
            id: loggedInUser.id,
          },
        },
      },
      include: {
        users: true,
        messages: true,
      }
    }))
  },
};