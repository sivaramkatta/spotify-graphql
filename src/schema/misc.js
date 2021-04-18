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

  enum PersonalizationType {
    ARTISTS
    TRACKS
  }

  enum TimeRange {
    SHORT
    MEDIUM
    LONG
  }

  input PersonalizationInput {
    type: PersonalizationType!
    time_range: TimeRange
    limit: Int
    offset: Int
  }

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

  type SimplifiedPlaylist {
    id: String
    collaborative: Boolean
    description: String
    images: Image
    name: String
    owner: PublicUser
    public: Boolean
    total_tracks: Int
  }

  type FeaturedPlaylistResponse {
    message: String
    items: [SimplifiedPlaylist]
    total_items: Int
  }

  type Category {
    id: String
    icons: [Image]
    name: String
  }

  type CategoriesResponse {
    total: Int
    items: [Category]
  }

  type CategoriesPlaylistResponse {
    items: [SimplifiedPlaylist]
    total: Int
  }

  input CategoriesPlaylistInput {
    category_id: String
    limit: Int
    offset: Int
  }

  union PersonalizedResponse = SimplifiedTrack | SimplifiedArtist

  directive @source(name: String) on FIELD_DEFINITION

  type Query {
    getNewReleases(payload: GenericAlbumTrackInput): [RecommendedAlbum]
      @source(name: "getNewReleases")
    getPersonalizedData(payload: PersonalizationInput): [PersonalizedResponse]
      @source(name: "getPersonalizedData")
    search(payload: searchInput): SearchResponse @source(name: "search")
    getFeaturedPlaylists(limit: Int, offset: Int): FeaturedPlaylistResponse
      @source(name: "getFeaturedPlaylists")
    getAllCategories(limit: Int, offset: Int): CategoriesResponse
      @source(name: "getAllCategories")
    getCategory(id: String!): Category @source(name: "getCategory")
    getcategoriesPlaylists(
      payload: CategoriesPlaylistInput
    ): CategoriesPlaylistResponse @source(name: "getcategoriesPlaylists")
    getRecommendedGenres: [String] @source(name: "getRecommendedGenres")
  }
`;
