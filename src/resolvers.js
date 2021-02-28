import { getCountryName } from "./utils/country_codes";

export const resolvers = {
  Query: {
    userQueries: () => ({}),
    albumQueries: () => ({}),
    artistQueries: () => ({}),
    trackQueries: () => ({})
  },
  PrivateUser: {
    country: parent => {
      return parent.country ? getCountryName(parent.country) : null;
    },
    follower_count: parent => parent.followers.total,
    account_type: parent => parent.product
  },
  PublicUser: {
    follower_count: parent => parent.followers.total
  },
  Artist: {
    follower_count: parent => parent.followers.total
  },
  Album: {
    tracks: parent => parent.tracks.items
  },
  RecommendedAlbum: {
    tracks: async (parent, __, { loaders: { tracksLoader } }) => {
      return await tracksLoader.load(parent.id);
    }
  },
  SearchResponse: {
    artists: parent => parent?.artists?.items,
    tracks: parent => parent?.tracks?.items,
    albums: parent => parent?.albums?.items
  },
  IncludeGroups: {
    ALBUM: "album",
    SINGLE: "single",
    APPEARS_ON: "appears_on",
    COMPILATION: "compilation"
  },
  SearchTypeEnum: {
    ALBUM: "album",
    ARTIST: "artist",
    TRACK: "track",
    PLAYLIST: "playlist"
  }
};
