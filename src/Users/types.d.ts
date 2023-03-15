import { PrismaClient, User } from "@prisma/client"

type Context = {
  loggedInUser?: User;
  client: PrismaClient;
}

export type Resolver = (root: any, args: any, context: Context, info: any) => any

export type Resolvers = {
  [key: string]: {
    [key: string]: Resolver
  }
}

export type searchResolver = (root: any, args: any, context: any, info: any) => any

export type searchResolvers = {
  [key: string]: {
    [key: string]: searchResolver
  }
}