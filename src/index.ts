import {GQLLocationInput, GQLMedicalStatsInput, GQLUserMetadataInput,} from "../graphql-types";
import fs from "fs";
import path from "path";
import {dateScalarType} from "./scalars/date.scalar";
import {DBConnection} from "./dal/dbConnection";

const {ApolloServer} = require('apollo-server');

const resolvers = {
    Date: dateScalarType,
    Query: {
        a: () => "asdfasd"
    },
    Mutation: {
        registerApp: (root: any, {appName, googleApiKey}: {
            appName: string, googleApiKey: string
        }) => {
            return true;
        },
        registerUser: (root: any, {userEmail, appToken, userMetadata}:
            { userEmail: string, appToken: string, userMetadata: GQLUserMetadataInput }) => {
            return true;
        },
        sendUserLocation: (root: any, {userEmail, location, appToken}: {
            userEmail: string, location: GQLLocationInput, appToken: string
        }) => {
            return null;
        },
        sendMedicalStats: (root: any, {userEmail, medicalStats, appToken}: {
            userEmail: string, medicalStats: GQLMedicalStatsInput, appToken: string
        }) => {
            return true;
        },
        sendEvent: (root: any, {userEmail, location, medicalStats, eventDescription, appToken}: {
            userEmail: string, location: GQLLocationInput, medicalStats: GQLMedicalStatsInput, eventDescription: string, appToken: string
        }) => {
            return true;
        }
        // sendUserLocation: (root: any, {email, location}: {
        //     email: string, location: GQLLocationInput
        // }) => {
        //     return usersService.updateUserLocation(email, location);
        // },
        // registerUser: (root: any, {user}: { user: GQLUserRegistrationInput }) => {
        //     console.log("saved user: " + JSON.stringify(user));
        //     return usersService.register(user);
        // },
        // login: (root: any, {email, password}: { email: string, password: string }) => {
        //     return usersService.login(email, password);
        // },
        // setUserInformation: (root: any, {email, userInfo}: { email: string, userInfo: GQLUserInformationInput }) => {
        //     return usersService.setUserInformation(email, userInfo);
        // }
    },
};

const typeDefs = fs.readFileSync(path.join(__dirname, "schema.graphqls"), "utf8");

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}: { url: string }) => {
    let dbConnection = new DBConnection();
    dbConnection.connect();
    console.log(`🚀  Server ready at ${url}`);
});

