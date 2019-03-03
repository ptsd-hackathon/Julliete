import {GQLLocationInput, GQLUserInput} from "../graphql-types";

const {ApolloServer, gql} = require('apollo-server');
import fs from "fs";
import path from "path";
import {scheduleJob} from "node-schedule";
import {UserRegistration} from "./bl/UserRegistration";
import {EchoConnector} from "./bl/connectors/EchoConnector";
import {LimaConnector} from "./bl/connectors/LimaConnector";
import {LocationSender} from "./bl/LocationSender";

const userRegistration = new UserRegistration();
const locationSender = new LocationSender(new EchoConnector(), new LimaConnector() );

const resolvers = {
    Query: {
        // user: () => { return {"id":"Asdf", "email":"yarinvak@gmail.com"} },
        users: () => {
            console.log(userRegistration.usersFromDb);
            return userRegistration.usersFromDb;
        }
    },
    Mutation: {
        sendUserLocation: (root: any, {email, location}: { email: string, location: GQLLocationInput }) => {
            locationSender.sendLocation(email, {lat: location.lat, long:location.long});
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
    // console.log('Sending Request');
});

