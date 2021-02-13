import { ApolloServer } from "apollo-server";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";
import { MvrpAPI } from "./datasources";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ mvrpAPI: new MvrpAPI() })
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
