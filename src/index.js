import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { SpotifyRestDataSource } from "./datasource";
import { RestDirective } from "./directives";
import { tracksLoader } from "./dataloader";

const server = new ApolloServer({
  typeDefs,
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
