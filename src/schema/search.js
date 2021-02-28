import { gql } from "apollo-server";

export const searchTypeDefs = gql`
  enum SearchTypeEnum {
    ALBUM
    ARTIST
    TRACK
    PLAYLIST
  }

  input searchInput {
    search_term: String!
    type: [SearchTypeEnum!]!
    market: String
    limit: Int
    offset: Int
  }

  type SearchResponse {
    artists: [Artist]
    tracks: [Track]
    albums: [Album]
  }

  extend type Query {
    search(payload: searchInput): SearchResponse @source(name: "search")
  }
`;
