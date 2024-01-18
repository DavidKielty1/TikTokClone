import { gql } from "@apollo/client";

export const GET_POSTS_BY_USER_ID = gql`
  query GetPostsByUserId($userId: Float!) {
    getPostsByUserId(userId: $userId) {
      id
      text
      video
      user {
        id
        fullname
        email
      }
    }
  }
`;
