import {GQLLocationInput, GQLUserInput} from "../graphql-types";

const {ApolloServer, gql} = require('apollo-server');
import fs from "fs";
import path from "path";
import {scheduleJob} from "node-schedule";
import {UserRegistration} from "./bl/UserRegistration";

const userRegistration = new UserRegistration();

const resolvers = {
    Query: {
        // user: () => { return {"id":"Asdf", "email":"yarinvak@gmail.com"} },
        users: () => {
            console.log(userRegistration.usersFromDb);
            return userRegistration.usersFromDb;
        }
    },
    Mutation: {
        sendUserLocation: (root: any, {userId, location}: { userId: string, location: GQLLocationInput }) => {
            return true;
        },
        registerUser: (root: any, {user}: { user: GQLUserInput }) => {
            return userRegistration.registerUser(user);
        },
        login: (root: any, {email, password}: { email: string, password: string }) => {
            return userRegistration.login(email, password);
        }
    }
};

const typeDefs = fs.readFileSync(path.join(__dirname, "schema.graphqls"), "utf8");

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}: { url: string }) => {
    console.log(`🚀  Server ready at ${url}`);
});

const scheduler = scheduleJob('*/5 * * * * *', function () {
    console.log('Sending Request');
});

