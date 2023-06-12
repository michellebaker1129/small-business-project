import { gql } from "@apollo/client";

export const GET_ALL_POSTS_BY_CLIENT_ID = gql`
  query getAllPostsByClientId($clientId: ID!) {
    getAllPostsByClientId(clientId: $clientId) {
      id
      receiverId
      receiverFullname
      senderId
      senderFullname
      message
      createdAt
    }
  }
`;

export const NEW_MESSAGE_SUBSCRIPTION = gql`
  subscription messageSent($clientId: ID!) {
    messageSent(clientId: $clientId) {
      id
      receiverId
      receiverFullname
      senderId
      senderFullname
      message
      createdAt
    }
  }
`;

export const GET_ALL_ADMINS = gql`
  query getAllAdmins {
    getAllAdmins {
      id
      fullname
    }
  }
`;

export const GET_ALL_USERS = gql`
  query getAllUsers($id: ID!) {
    getAllUsers(id: $id) {
      id
      email
      fullname
    }
  }
`;