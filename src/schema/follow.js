import { gql } from "apollo-server";

export const followTypeDefs = gql`
  extend type Query {
    followPlaylist(playlist_id: String!, public: Boolean): Boolean
      @source(name: "followPlaylist")
    unfollowPlaylist(playlist_id: String!): Boolean
      @source(name: "unfollowPlaylist")
  }
`;
