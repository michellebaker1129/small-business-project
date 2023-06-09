import gql from "graphql-tag";

const typeDefs = gql`
  scalar Date

  type Image {
    id: ID
    url: String
    senderId: ID
  }

  type Comment {
    id: ID
    message: String
    senderId: ID
    postId: ID
  }

  type Post {
    id: ID
    message: String
    senderId: ID
    receiverId: ID
    createdAt: Date
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

  input messageInput {
    message: String
    senderId: ID
    receiverId: ID
  }

  type Query {
    users: [User]
    user(id: ID): User
    getAllUsers(id: ID): [User]
    getUserById(clientId: ID, adminId: ID, userIsAdmin: Boolean): User

    posts: [Post]
    post(id: ID): Post
    getAllPostsByConversationParticipantIds(clientId: ID, adminId: ID): [Post]

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
      senderId: ID
      images: [String]
    ): Post

    updatePost(
      id: ID
      message: String
      senderId: ID
    ): Post

    deletePost(id: ID): Post

    deleteAllPosts: Boolean

    sendMessage(
      messageInput: messageInput
    ): Post

    createComment(
      message: String
      senderId: ID
      postId: ID
    ): Comment

    updateComment(
      id: ID
      message: String
      senderId: ID
      postId: ID
    ): Comment

    deleteComment(id: ID): Comment

    createImage(
      url: String
      senderId: ID
    ): Image

    updateImage(
      id: ID
      url: String
      senderId: ID
    ): Image

    deleteImage(id: ID): Image
  }

  type Subscription {
    messageSent(receiverId: ID!): Post
  }
`;

export { typeDefs };
