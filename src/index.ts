const { ApolloServer, gql } = require('apollo-server');
import fs from "fs";
import path from "path";

const books = [
    {
        title: 'Harry Potter and the Chamber of Secrets',
        author: 'J.K. Rowling',
    },
    {
        title: 'Jurassic Park',
        author: 'Michael Crichton',
    },
];

const resolvers = {
    Query: {
        books: () => books,
    },
};

const typeDefs = fs.readFileSync(path.join(__dirname, "schema.graphqls"), "utf8");

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }: {url: string}) => {
    console.log(`🚀  Server ready at ${url}`);
});
