import { gql } from 'apollo-server-express';
export default gql`
  type MutationResponse {
    ok: Boolean!
    error: String!
  }
  type IdMutationResponse {
    ok: Boolean!
    id: Int
    error: String
  }
`;