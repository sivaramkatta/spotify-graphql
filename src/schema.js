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

  type Artist {
    follower_count: Int
    genres: [String]
    id: String
    images: [Image]
    name: String
    popularity: Int
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

  enum IncludeGroups {
    ALBUM
    SINGLE
    APPEARS_ON
    COMPILATION
  }

  input ArtistAlbums {
    id: ID!
    include_groups: [IncludeGroups]
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
    getMultipleArtists(ids: [String!]!): [Artist]
      @source(name: "getMultipleArtists")
    getArtist(id: String!): Artist @source(name: "getArtist")
    getArtistTopTracks(id: String!, market: String!): [Track]
      @source(name: "getArtistTopTracks")
    getArtistRelatedArtists(id: ID!): [Artist]
      @source(name: "getArtistRelatedArtists")
    getArtistAlbums(payload: ArtistAlbums): [Album]
      @source(name: "getArtistAlbums")
  }
`;
