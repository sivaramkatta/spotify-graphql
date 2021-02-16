import { getCountryName } from "./country_codes";

export const resolvers = {
  Query: {
    me: (_, __, { dataSources }) => dataSources.spotify.getMe(),
    user: (_, args, { dataSources }) => dataSources.spotify.getUser(args.id),
    getMultipleAlbums: (_, args, { dataSources }) =>
      dataSources.spotify.getMultipleAlbums(args.ids, args.market)
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
  }
};
