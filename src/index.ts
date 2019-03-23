import {GQLLocationInput, GQLUserInformationInput, GQLUserRegistrationInput} from "../graphql-types";
import fs from "fs";
import path from "path";
import {scheduleJob} from "node-schedule";
import {UsersService} from "./bl/services/usersService";
import {NewsSeverityServiceConnector} from "./bl/connectors/newsServerityService.connector";
import {WeatherAndCrowdedPlacesServiceConnector} from "./bl/connectors/weatherAndCrowdedPlacesServiceConnector";
import {LocationSender} from "./bl/locationSender";
import {UserInformationSender} from "./bl/UserInformationSender";
import {BodyStatsServiceConnector} from "./bl/connectors/bodyStatsService.connector";
import {UserDAL} from "./DAL/repositories/UserDAL";
import {dateScalarType} from "./scalars/date.scalar";
import {UserConditionService} from "./bl/services/userConditionService";

const {ApolloServer} = require('apollo-server');

const usersService = new UsersService(new UserDAL());
const locationSender = new LocationSender(new NewsSeverityServiceConnector(), new WeatherAndCrowdedPlacesServiceConnector());
const userInformationSender = new UserInformationSender(new BodyStatsServiceConnector());
const statsService: UserConditionService = new UserConditionService(new NewsSeverityServiceConnector(), new WeatherAndCrowdedPlacesServiceConnector(), new BodyStatsServiceConnector(), usersService);


const resolvers = {
    Date: dateScalarType,
    Query: {
        // users: () => {
        //     console.log(usersService.users);
        //     return usersService.users;
        // },
        weatherPreferences: () => {
            let limaConnector = new WeatherAndCrowdedPlacesServiceConnector();
            return limaConnector.getWeatherPreferences().then((response: any) => {
                return response.data;
            }).catch((err) => {
                throw new Error(err);
            });
        },
        placesTypes: () => {
            let limaConnector = new WeatherAndCrowdedPlacesServiceConnector();
            return limaConnector.getPlaceTypes().then(res => {
                return res.data.places;
            }).catch(err => console.log(err.response));
        }
    },
    Mutation: {
        sendUserLocation: (root: any, {email, location}: {
            email: string, location: GQLLocationInput
        }) => {
            // usersService.getUserByEmail(email).then((userByEmail: any) => {
            //     if (!userByEmail) {
            //         throw new Error("user does not exist");
            //     }
            //     console.log(userByEmail);
            //     locationSender.sendLocation(email, {
            //         lat: location.lat,
            //         long: location.long
            //     }, userByEmail).then((placesSeverityResponse: any) => {
            //         userInformationSender.sendUserInformation(userByEmail);
            //         let severityObject = {placesSeverity: placesSeverityResponse.data};
            //         let severityCalculator = new SeverityCalculator();
            //         severityCalculator.calculateAndSendAlert(severityObject, userOneSignalId);
            //     }).catch((err) => {
            //         throw new Error(err)
            //     });
            //
            // });
            // return true;
            return usersService.updateUserLocation(email, location);
        },
        registerUser: (root: any, {user}: { user: GQLUserRegistrationInput }) => {
            console.log("saved user: " + JSON.stringify(user));
            return usersService.register(user);
        },
        login: (root: any, {email, password}: { email: string, password: string }) => {
            return usersService.login(email, password);
        },
        setUserInformation: (root: any, {email, userInfo}: { email: string, userInfo: GQLUserInformationInput }) => {
            return usersService.setUserInformation(email, userInfo);
        }
    }
};

const typeDefs = fs.readFileSync(path.join(__dirname, "schema.graphqls"), "utf8");

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}: { url: string }) => {
    console.log(`🚀  Server ready at ${url}`);
});

const scheduler = scheduleJob('*/5 * * * * *', function () {
    console.log("scheduled task is running now");
    statsService.calculateStats();
});

