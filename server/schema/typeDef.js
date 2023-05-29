import { gql } from 'apollo-server';

// The GraphQL schema
const typeDefs = gql`
  type Image {
    id: ID!
    imagePath: String!
    postId: ID!
    userId: ID!
    createdAt: String!
  }

  type Post {
    id: ID!
    userId: ID!
    postContent: String!
    createdAt: String!
    updatedAt: String!
    postType: String!
    images: [Image]
  }

  type User {
    id: ID!
    fullname: String!
    email: String!
    addressStreet: String!
    addressStreet2: String
    addressCity: String!
    addressState: String!
    addressZip: String!
    phoneNumber: String!
    passwordHash: String!
    createdAt: String!
    updatedAt: String!
    posts: [Post]
  }

  type Query {
    user_getAllUsers: [User!]!
    user_getUserById(id: ID!): User

    post_getAllPostsByUserId(id: ID!): [Post!]!
    post_getPostById(id: ID!): Post

    image_getAllImagesByUserId(id: ID!): [Image!]!
    image_getImageById(id: ID!): Image
  }

  type Mutation {
    user_createUser(
      fullname: String!,
      email: String!,
      addressStreet: String!,
      addressStreet2: String,
      addressCity: String!,
      addressState: String!,
      addressZip: String!,
      phoneNumber: String!,
      passwordHash: String!
    ): User!

    user_updateUser(
      id: ID!,
      fullname: String,
      email: String,
      addressStreet: String,
      addressStreet2: String,
      addressCity: String,
      addressState: String,
      addressZip: String,
      phoneNumber: String,
      passwordHash: String
    ): User!

    user_deleteUser(id: ID!): User!

    post_createPost(
      userId: ID!,
      postContent: String!,
      postType: String!
    ): Post!

    post_updatePost(
      id: ID!,
      userId: ID!,
      postContent: String!,
      postType: String!
    ): Post!

    post_deletePost(id: ID!): Post!

    image_createImage(
      imagePath: String!,
      postId: ID!,
      userId: ID!
    ): Image!

    image_deleteImage(id: ID!): Image!
  }
`;

export {
  typeDefs,
}
