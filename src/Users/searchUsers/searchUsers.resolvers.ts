import { searchResolvers } from './../types.d';

const resolvers: searchResolvers = {
  Query: {
    searchUsers: async (_, {keyword}, {client}) => await client.user.findMany({
        where: {
          userName: {
            contains: keyword.toLowerCase(),
          },
        },
      })
  }
}

export default resolvers;