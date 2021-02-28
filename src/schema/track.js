import { gql } from "apollo-server";

export const trackTypeDefs = gql`
  type Track {
    id: String
    name: String
    duration_ms: Int
    preview_url: String
    album: SimplifiedAlbum
    artists: [SimplifiedArtist]
    available_markets: [String]
  }

  type SimplifiedTrack {
    id: String
    name: String
    duration_ms: Int
    preview_url: String
    artists: [SimplifiedArtist]
    available_markets: [String]
  }
`;
