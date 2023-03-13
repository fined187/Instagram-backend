import client from "../../client"

export default {
  Query: {
    searchUsers: async (_, {keyword}) => await client.user.findMany({
        where: {
          userName: {
            contains: keyword.toLowerCase(),
          },
        },
      })
  }
}