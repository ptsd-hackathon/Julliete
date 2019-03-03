import {GQLLocationInput, GQLUserInput} from "../graphql-types";
const { ApolloServer, gql } = require('apollo-server');
import fs from "fs";
import path from "path";
import {scheduleJob} from "node-schedule";

const resolvers = {
    Query: {
        user: () => { return {"id":"Asdf", "email":"yarinvak@gmail.com"} },
    },
    Mutation: {
        sendUserLocation: (userId: string, location: GQLLocationInput) => {
            return true;
        },
        registerUser: (user: GQLUserInput) => {
            return true;
        }
    }
};

const typeDefs = fs.readFileSync(path.join(__dirname, "schema.graphqls"), "utf8");

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }: {url: string}) => {
    console.log(`🚀  Server ready at ${url}`);
});

const scheduler = scheduleJob('*/5 * * * * *', function(){
    console.log('Sending Request');
});

