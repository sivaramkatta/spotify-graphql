import { gql } from "apollo-server";

export const albumTypeDefs = gql`
  type Album {
    id: String
    name: String
    label: String
    popularity: Int
    release_date: String
    album_type: String
    genres: [String]
    artists: [SimplifiedArtist]
    available_markets: [String]
    images: [Image]
    total_tracks: Int
    tracks: [SimplifiedTrack]
  }

  type SimplifiedAlbum {
    id: String
    name: String
    release_date: String
    album_type: String
    artists: [SimplifiedArtist]
    available_markets: [String]
    total_tracks: Int
    images: [Image]
  }

  input AlbumTrackInput {
    id: ID!
    market: String
    limit: Int
    offset: Int
  }

  type AlbumQueries {
    getMultipleAlbums(ids: [String!]!, market: String): [Album]
      @source(name: "getMultipleAlbums")
    getAlbum(id: ID!): Album @source(name: "getAlbum")
    getAlbumTracks(payload: AlbumTrackInput): [SimplifiedTrack]
      @source(name: "getAlbumTracks")
  }

  extend type Query {
    albumQueries: AlbumQueries
  }
`;
