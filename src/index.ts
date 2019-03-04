import {GQLLocationInput, GQLUserRegistrationInput} from "../graphql-types";

const {ApolloServer} = require('apollo-server');
import fs from "fs";
import path from "path";
import {scheduleJob} from "node-schedule";
import {UsersService} from "./bl/UsersService";
import {EchoConnector} from "./bl/connectors/EchoConnector";
import {LimaConnector} from "./bl/connectors/LimaConnector";
import {LocationSender} from "./bl/LocationSender";
import {UserInformationSender} from "./bl/UserInformationSender";
import {WhiskeyConnector} from "./bl/connectors/WhiskeyConnector";
import {UserDAL} from "./DAL/repositories/UserDAL";

import {OnesignalConnector} from "./bl/connectors/OnesignalConnector";

const usersService = new UsersService(new UserDAL());
const locationSender = new LocationSender(new EchoConnector(), new LimaConnector());
const userInformationSender = new UserInformationSender(new WhiskeyConnector());

const resolvers = {
    Query: {
        users: () => {
            console.log(usersService.users);
            return usersService.users;
        },
        weatherPreferences: () => {
            let limaConnector = new LimaConnector();
            return limaConnector.getWeatherPreferences().then((response: any) => {
                return response.data;
            }).catch((err) => {
                throw new Error(err);
            });
        },
        placesTypes: () => {
            let limaConnector = new LimaConnector();
            return limaConnector.getPlaceTypes().then(res => {
                return res.data.places;
            }).catch(err => console.log(err.response));
        }
    },
    Mutation: {
        sendUserLocation: (root: any, {email, location}: { email: string, location: GQLLocationInput }) => {
            locationSender.sendLocation(email, {lat: location.lat, long: location.long});
            let userByEmail = usersService.getUserByEmail(email);
            userInformationSender.sendUserInformation(userByEmail);
            let onesignalConnector = new OnesignalConnector();
            onesignalConnector.send("OSHER HAMELECH!!!!!!!!!!!!!")
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

