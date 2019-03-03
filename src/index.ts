import {GQLLocationInput, GQLUserRegistrationInput} from "../graphql-types";

const {ApolloServer, gql} = require('apollo-server');
import fs from "fs";
import path from "path";
import {scheduleJob} from "node-schedule";
import {UsersService} from "./bl/UsersService";
import {EchoConnector} from "./bl/connectors/EchoConnector";
import {LimaConnector} from "./bl/connectors/LimaConnector";
import {LocationSender} from "./bl/LocationSender";
import {UserInformationSender} from "./bl/UserInformationSender";
import {WhiskeyConnector} from "./bl/connectors/WhiskeyConnector";

const usersService = new UsersService();
const locationSender = new LocationSender(new EchoConnector(), new LimaConnector());
const userInformationSender = new UserInformationSender(new WhiskeyConnector());

const resolvers = {
    Query: {
        // user: () => { return {"id":"Asdf", "email":"yarinvak@gmail.com"} },
        users: () => {
            console.log(usersService.users);
            return usersService.users;
        }
    },
    Mutation: {
        sendUserLocation: (root: any, {email, location}: { email: string, location: GQLLocationInput }) => {
            locationSender.sendLocation(email, {lat: location.lat, long: location.long});
            let userByEmail = usersService.getUserByEmail(email);
            userInformationSender.sendUserInformation(userByEmail);
            return true;
        },
        registerUser: (root: any, {user}: { user: GQLUserRegistrationInput }) => {
            return usersService.register(user);
        },
        login: (root: any, {email, password}: { email: string, password: string }) => {
            return usersService.login(email, password);
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

