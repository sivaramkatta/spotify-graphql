export const resolvers = spotifyApi => ({
  Query: {
    me: async () => {
      const { body } = await spotifyApi.getMe();
      const profile = {
        id: body.id,
        email: body.email,
        display_name: body.display_name
      };
      return profile;
    }
  }
});
