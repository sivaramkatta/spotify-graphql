import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { SpotifyRestDataSource } from "./datasource";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ spotify: new SpotifyRestDataSource() }),
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
