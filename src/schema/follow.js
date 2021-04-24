import { gql } from "apollo-server";

export const followTypeDefs = gql`
  type CheckUserFollow {
    user_id: String
    follows: Boolean
  }

  enum FollowType {
    ARTIST
    USER
  }

  enum Action {
    FOLLOW
    UNFOLLOW
  }

  input FollowInput {
    type: FollowType!
    id: [String!]!
    action: Action!
  }

  extend type Query {
    checkPlaylistFollowers(
      users: [String!]!
      playlist_id: String!
    ): [CheckUserFollow] @source(name: "checkPlaylistFollowers")
    getFollowersArtists(after: Int, limit: Int): [Artist]
      @source(name: "getFollowersArtists")
  }

  type Mutation {
    followPlaylist(playlist_id: String!, public: Boolean): Boolean
      @source(name: "followPlaylist")
    unfollowPlaylist(playlist_id: String!): Boolean
      @source(name: "unfollowPlaylist")
    followActions(payload: FollowInput): Boolean @source(name: "followActions")
  }
`;
