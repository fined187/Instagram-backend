import { gql } from "apollo-server";
//@ts-ignore
import Upload from "graphql-upload/Upload.mjs";

export default gql` 
  scalar Upload

  type EditProfileResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    editProfile(
      firstName: String
      lastName: String
      userName: String
      email: String
      password: String
      bio: String
      avatar: Upload
    ): EditProfileResult!
  }
`