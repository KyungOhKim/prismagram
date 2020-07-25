require("dotenv").config();
import { GraphQLServer } from "graphql-yoga";

const PORT = process.env.PORT || 4000;

//typeDefs
const typeDefs = `
    type Query{
        hello : String!
    }
`;

//resolvers
const resolvers = {
  Query: {
    hello: () => "hello",
  },
};

const server = new GraphQLServer({ typeDefs, resolvers });

server.start({ port: PORT }, () =>
  console.log(`server is running http://localhost:${PORT}`)
);
