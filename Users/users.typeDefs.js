import { gql } from "apollo-server-express";

export default gql `
  type User {
    id: String!
    firstName: String!
    lastName: String
    userName: String!
    email: String!
    createdAt: String!
    updatedAt: String!
    bio: String
    avatar: String
    following: [User]
    followers: [User]
    totalFollowers: Int!
    totalFollowing: Int!
  }
`;

// isFollowing: Boolean!
// isMe: Boolean!