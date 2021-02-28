import { getCountryName } from "./utils/country_codes";

export const resolvers = {
  Query: {
    userQueries: () => ({}),
    albumQueries: () => ({}),
    artistQueries: () => ({})
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
  IncludeGroups: {
    ALBUM: "album",
    SINGLE: "single",
    APPEARS_ON: "appears_on",
    COMPILATION: "compilation"
  }
};
