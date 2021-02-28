import { gql } from "apollo-server";

export const commonTypeDefs = gql`
  type RecommendedAlbum {
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

  type Image {
    height: Int
    width: Int
    url: String
  }

  input GenericAlbumTrackInput {
    country: String
    limit: Int
    offset: Int
  }

  directive @source(name: String) on FIELD_DEFINITION

  type Query {
    getNewReleases(payload: GenericAlbumTrackInput): [RecommendedAlbum]
      @source(name: "getNewReleases")
  }
`;
