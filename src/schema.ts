import { DocumentNode, GraphQLSchema } from "graphql";
import { IResolvers, loadFilesSync, makeExecutableSchema, mergeResolvers, mergeTypeDefs } from "graphql-tools";

const loadedTypes = loadFilesSync(`${__dirname}/**/*.typeDefs.ts`);
const loadedResolvers = loadFilesSync(`${__dirname}/**/*.resolvers.ts`);

const typeDefs: DocumentNode = mergeTypeDefs(loadedTypes);
const resolvers: IResolvers = mergeResolvers(loadedResolvers);

const schema: GraphQLSchema = makeExecutableSchema({typeDefs: typeDefs, resolvers: resolvers});

export default schema;