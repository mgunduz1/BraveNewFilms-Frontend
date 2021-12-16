import { gql } from "@apollo/client";

export const CREATE_FOLLOWING_MUTATION = gql`
  mutation createFollowing(
    $userId: ID!
    $followableType: String!
    $followableId: ID!
  ) {
    createFollowing(
      userId: $userId
      followableType: $followableType
      followableId: $followableId
    ) {
      id
    }
  }
`;

export const DESTROY_FOLLOWING_MUTATION = gql`
  mutation destroyFollowing(
    $userId: ID!
    $followableType: String!
    $followableId: ID!
  ) {
    destroyFollowing(
      userId: $userId
      followableType: $followableType
      followableId: $followableId
    ) {
      id
    }
  }
`;
