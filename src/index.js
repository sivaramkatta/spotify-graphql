import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi();

const server = new ApolloServer({
  typeDefs,
  resolvers: resolvers(spotifyApi),
  context: ({ req }) => {
    if (req.headers.authorization) {
      spotifyApi.setAccessToken(req.headers.authorization);
    } else {
      throw Error("Authorization token is mandatory");
    }
    return null;
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
