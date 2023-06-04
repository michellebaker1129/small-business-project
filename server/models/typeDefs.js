const gql = require("graphql-tag");

const typeDefs = gql`
  type Image {
    id: ID
    url: String
    userId: ID
  }

  type Comment {
    id: ID
    message: String
    userId: ID
    postId: ID
    images: [Image]
  }

  type Post {
    id: ID
    message: String
    userId: ID
    comments: [Comment]
    images: [Image]
  }

  type User {
    id: ID
    fullname: String
    email: String
    phoneNumber: String
    address: String
    address2: String
    city: String
    state: String
    zip: String
    country: String
    role: String
    posts: [Post]
    comments: [Comment]
    images: [Image]
    password: String
    token: String
  }

  input registerInput {
    email: String
    password: String
    confirmPassword: String
    role: String
  }

  input loginInput {
    email: String
    password: String
  }

  type Query {
    users: [User]
    user(id: ID): User
    getAllUsers(id: ID): [User]
    getUserById(clientId: ID, adminId: ID): User

    posts: [Post]
    post(id: ID): Post
    getPostsByUserId(userId: ID): [Post]

    comments: [Comment]
    comment(id: ID): Comment
    
    images: [Image]
    image(id: ID): Image
  }

  type Mutation {
    createUser(
      fullname: String
      email: String
      phoneNumber: String
      address: String
      address2: String
      city: String
      state: String
      zip: String
      country: String
      role: String
      password: String
      token: String
    ): User

    registerUser(registerInput: registerInput): User
    loginUser(loginInput: loginInput): User

    updateUser(
      id: ID
      fullname: String
      email: String
      phoneNumber: String
      address: String
      address2: String
      city: String
      state: String
      zip: String
      country: String
      role: String
      password: String
      token: String
    ): User

    deleteUser(id: ID): User

    createPost(
      message: String
      userId: ID
      images: [String]
    ): Post

    updatePost(
      id: ID
      message: String
      userId: ID
    ): Post

    deletePost(id: ID): Post

    createComment(
      message: String
      userId: ID
      postId: ID
    ): Comment

    updateComment(
      id: ID
      message: String
      userId: ID
      postId: ID
    ): Comment

    deleteComment(id: ID): Comment

    createImage(
      url: String
      userId: ID
    ): Image

    updateImage(
      id: ID
      url: String
      userId: ID
    ): Image

    deleteImage(id: ID): Image
  }
`;

module.exports = { typeDefs };
