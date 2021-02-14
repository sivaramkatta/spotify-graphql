import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    me: User
  }
  type User {
    id: String
    email: String
    display_name: String
    country: String
    type: String
    account_type: String
    follower_count: Int
    images: [Image]
  }
  type Image {
    height: Int
    width: Int
    url: String
  }
`;
