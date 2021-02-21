import { ApolloServer, SchemaDirectiveVisitor } from "apollo-server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { SpotifyRestDataSource } from "./datasource";
import { RestDirective } from "./directives";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ spotify: new SpotifyRestDataSource() }),
  schemaDirectives: {
    source: RestDirective
  },
  context: ({ req }) => {
    if (req.headers.authorization) {
      return { token: req.headers.authorization };
    }
    throw Error("Authorization token is mandatory");
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
