import { gql } from "apollo-server";

export const typeDefs = gql`
  type User {
    id: String
    email: String
    display_name: String
  }
  type Query {
    me: User
  }
`;
