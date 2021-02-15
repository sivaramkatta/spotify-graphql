import { gql } from "apollo-server";

export const typeDefs = gql`
  type Query {
    me: PrivateUser
    user(id: String): PublicUser
  }

  type PrivateUser {
    id: String
    email: String
    display_name: String
    country: String
    type: String
    account_type: String
    follower_count: Int
    images: [Image]
    uri: String
    href: String
  }

  type PublicUser {
    id: String
    display_name: String
    follower_count: Int
    images: [Image]
    uri: String
    href: String
    type: String
  }

  type Image {
    height: Int
    width: Int
    url: String
  }
`;
