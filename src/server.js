import dotenv from "dotenv";
import path from "path";
// src까지 경로임
// console.log(__dirname);
dotenv.config({ path: path.resolve(__dirname, ".env") }); // __dirname 에서 .env까지
import { GraphQLServer } from "graphql-yoga";
import logger from "morgan";
import schema from "./schema";
// import { sendSecretMail } from "./utils";
import { sendSecretMail } from "./utils";

sendSecretMail("kko0831@hanmail.net", "secret123");
console.log(process.env.MAILGUN_API_KEY);
const PORT = process.env.PORT || 4000;

//typeDefs
// const typeDefs = `
// type Query{
//   hello : String!
// }
// `;

//resolvers
// const resolvers = {
// Query: {
// hello: () => "hello",
// },
// };

// type , resolvers를 server.js에서 선언한 버전
// const server = new GraphQLServer({typeDefs,resolvers});
// schema가 api를 합친 버전
const server = new GraphQLServer({ schema });
server.express.use(logger("dev"));

server.start({ port: PORT }, () =>
  console.log(`server is running http://localhost:${PORT}`)
);
