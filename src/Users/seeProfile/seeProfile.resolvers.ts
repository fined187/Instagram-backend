import { protectedResolver } from '../users.utils';
import { Resolvers } from './../types.d';

const resolvers: Resolvers = {
  Query: {
    seeProfile: protectedResolver((_, {userName}, {client}) => client.user.findUnique({
      where: {
        userName
      },
      include: {
        following: true,
        followers: true,
      }
    }), )
  },
};

export default resolvers;