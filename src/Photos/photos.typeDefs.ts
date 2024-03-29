import { gql } from 'apollo-server-express';

export default gql`
  type Photo {
    id: Int!
    user: User!
    file: String!
    caption: String
    hashtags: [Hashtag]
    createAt: String!
    updatedAt: String!
    likes: Int!
    commentsNumber: Int!
    comments: [Comment]
    isMine: Boolean!
    isLiked: Boolean!
  }
  type Hashtag {
    id: Int!
    hashtag: String!
    photos(page: Int!): [Photo]
    totalPhotos: Int!
    createAt: String!
    updatedAt: String!
  }

  type Like {
    id: Int!
    photo: Photo!
    createAt: String!
    updatedAt: String!
  }
`;