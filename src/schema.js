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

  type SimplifiedAlbum {
    album_type: String
    artists: [SimplifiedArtist]
    available_markets: [String]
    id: String
    images: [Image]
    name: String
    release_date: String
  }

  type SimplifiedArtist {
    id: String
    name: String
  }

  type Track {
    album: [SimplifiedAlbum]
    artisis: [SimplifiedArtist]
    available_markets: [String]
    duration_ms: Int
    id: String
    name: String
    popularity: String
    preview_url: String
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

  input AlbumTrackInput {
    id: ID!
    market: String
    limit: Int
    offset: Int
  }

  directive @source(name: String) on FIELD_DEFINITION

  type Query {
    getMe: PrivateUser @source(name: "getMe")
    getUser(id: String!): PublicUser @source(name: "getUser")
    getMultipleAlbums(ids: [String!]!, market: String): [Album]
      @source(name: "getMultipleAlbums")
    getAlbum(id: ID!): Album @source(name: "getAlbum")
    getAlbumTracks(payload: AlbumTrackInput): [Track]
      @source(name: "getAlbumTracks")
  }
`;
