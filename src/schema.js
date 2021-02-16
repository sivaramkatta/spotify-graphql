import { gql } from "apollo-server";

export const typeDefs = gql`
  type PrivateUser {
    id: String
    email: String
    display_name: String
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

  type Album {
    id: String
    album_type: String
    artists: [SimplifiedArtist]
    available_markets: [String]
    genres: [String]
    images: [Image]
    label: String
    name: String
    popularity: Int
    release_date: String
    tracks: SimplifiedTrack
  }

  type SimplifiedArtist {
    id: String
    name: String
  }

  type SimplifiedTrack {
    artists: [SimplifiedArtist]
    available_markets: [String]
    duration_ms: Int
    id: String
    name: String
    preview_url: String
  }

  type Image {
    height: Int
    width: Int
    url: String
  }

  type Query {
    me: PrivateUser
    user(id: String!): PublicUser
    getMultipleAlbums(ids: [String!]!, market: String): [Album]
  }
`;
