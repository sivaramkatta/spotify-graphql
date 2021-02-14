export const resolvers = {
  Query: {
    me: (parent, args, { dataSources }) => {
      return dataSources.spotify.getMe();
    }
  }
};
