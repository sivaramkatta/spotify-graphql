export const resolvers = {
  Query: {
    me: (_, __, { dataSources }) => dataSources.spotify.getMe()
  },
  User: {
    follower_count: parent => parent.followers.total,
    account_type: parent => parent.product
  }
};
