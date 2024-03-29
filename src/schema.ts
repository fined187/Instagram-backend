import { loadFilesSync, mergeResolvers, mergeTypeDefs } from "graphql-tools";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.ts`);

export const typeDefs = mergeTypeDefs(loadedTypes);
export const resolvers: any = mergeResolvers(loadedResolvers);
