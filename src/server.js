import { ApolloServer } from "apollo-server";
import {
  albumTypeDefs,
  userTypeDefs,
  artistTypeDefs,
  commonTypeDefs,
  trackTypeDefs
} from "./schema";
import { resolvers } from "./resolvers";
import { SpotifyRestDataSource } from "./utils/datasource";
import { RestDirective } from "./utils/directives";
import { tracksLoader } from "./utils/dataloader";

const server = new ApolloServer({
  typeDefs: [
    userTypeDefs,
    albumTypeDefs,
    artistTypeDefs,
    trackTypeDefs,
    commonTypeDefs
  ],
  resolvers,
  dataSources: () => ({ spotify: new SpotifyRestDataSource() }),
  schemaDirectives: {
    source: RestDirective
  },
  context: ({ req }) => {
    if (req.headers.authorization) {
      const token = req.headers.authorization;
      return {
        token,
        loaders: { tracksLoader: tracksLoader(token) }
      };
    }
    throw Error("Authorization token is mandatory");
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
