import fs from "fs";
import path from "path";
import {dateScalarType} from "./scalars/date.scalar";
import {DBConnection} from "./dal/dbConnection";
import {registerApp} from "./bl/resolvers/registerApp.resolver";
import {sendUserLocation} from "./bl/resolvers/sendUserLocation.resolver";
import {registerUser} from "./bl/resolvers/registerUser.resolver";
import {sendEvent} from "./bl/resolvers/sendEvent.resolver";
import {scheduleJob} from "node-schedule";
import {ClockIntegratorScheduler} from "./bl/schedulers/clockIntegrator.scheduler";

const {ApolloServer} = require('apollo-server');

const resolvers = {
    Date: dateScalarType,
    Query: {
        a: () => "asdfasd"
    },
    Mutation: {
        registerApp: registerApp,
        registerUser: registerUser,
        sendUserLocation: sendUserLocation,
        sendEvent: sendEvent
    },
};

const typeDefs = fs.readFileSync(path.join(__dirname, "schema.graphqls"), "utf8");

const server = new ApolloServer({typeDefs, resolvers});

server.listen().then(({url}: { url: string }) => {
    let dbConnection = new DBConnection();
    dbConnection.connect();
    console.log(`🚀  Server ready at ${url}`);

    let clockIntegrator = new ClockIntegratorScheduler();
    console.log("Starting scheduler task");
    scheduleJob('*/5 * * * * *', function () {
        clockIntegrator.execute().then(() => {
            console.log("Updated active clocks information for all users");
        }).catch(err => {
            console.log("Error updating clocks information " + err);
        });
    });
});