import { gql } from "apollo-server";

export const artistTypeDefs = gql`
  type Artist {
    id: String
    name: String
    popularity: Int
    follower_count: Int
    genres: [String]
    images: [Image]
  }

  type SimplifiedArtist {
    id: String
    name: String
  }

  input ArtistAlbums {
    id: ID!
    include_groups: [IncludeGroups]
    market: String
    limit: Int
    offset: Int
  }

  enum IncludeGroups {
    ALBUM
    SINGLE
    APPEARS_ON
    COMPILATION
  }

  type ArtistQueries {
    getMultipleArtists(ids: [String!]!): [Artist]
      @source(name: "getMultipleArtists")
    getArtist(id: String!): Artist @source(name: "getArtist")
    getArtistTopTracks(id: String!, market: String!): [Track]
      @source(name: "getArtistTopTracks")
    getArtistRelatedArtists(id: ID!): [Artist]
      @source(name: "getArtistRelatedArtists")
    getArtistAlbums(payload: ArtistAlbums): [SimplifiedAlbum]
      @source(name: "getArtistAlbums")
  }

  extend type Query {
    artistQueries: ArtistQueries
  }
`;
