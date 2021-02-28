import { gql } from "apollo-server";

export const userTypeDefs = gql`
  type PrivateUser {
    id: String
    display_name: String
    email: String
    country: String
    account_type: String
    follower_count: Int
    images: [Image]
  }

  type PublicUser {
    id: String
    display_name: String
    follower_count: Int
    images: [Image]
  }

  type UserQueries {
    getMe: PrivateUser @source(name: "getMe")
    getUser(id: String!): PublicUser @source(name: "getUser")
  }

  extend type Query {
    userQueries: UserQueries
  }
`;
