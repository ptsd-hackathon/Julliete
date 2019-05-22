"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var dbConnection_1 = require("./dal/dbConnection");
var registerApp_resolver_1 = require("./bl/resolvers/registerApp.resolver");
var sendUserLocation_resolver_1 = require("./bl/resolvers/sendUserLocation.resolver");
var registerUser_resolver_1 = require("./bl/resolvers/registerUser.resolver");
var sendEvent_resolver_1 = require("./bl/resolvers/sendEvent.resolver");
var node_schedule_1 = require("node-schedule");
var clockIntegrator_scheduler_1 = require("./bl/schedulers/clockIntegrator.scheduler");
var userEvents_resolver_1 = require("./bl/resolvers/userEvents.resolver");
var ApolloServer = require('apollo-server').ApolloServer;
var resolvers = {
    // DateTime: new GraphQLScalarType({
    //     name: 'DateTime',
    //     description: 'A date and time, represented as an ISO-8601 string',
    //     serialize: (value) => value.toISOString(),
    //     parseValue: (value) => new Date(value),
    //     parseLiteral: (ast) => {
    //         if (ast.kind === Kind.INT) {
    //             return parseInt(ast.value, 10); // ast value is always in string format
    //         }
    //         return null;
    //     }
    // }),
    Query: {
        getUserEvents: userEvents_resolver_1.userEvents
    },
    Mutation: {
        registerApp: registerApp_resolver_1.registerApp,
        registerUser: registerUser_resolver_1.registerUser,
        sendUserLocation: sendUserLocation_resolver_1.sendUserLocation,
        sendEvent: sendEvent_resolver_1.sendEvent
    },
};
var typeDefs = fs_1.default.readFileSync(path_1.default.join(__dirname, "schema.graphqls"), "utf8");
var server = new ApolloServer({ typeDefs: typeDefs, resolvers: resolvers });
server.listen().then(function (_a) {
    var url = _a.url;
    var dbConnection = new dbConnection_1.DBConnection();
    dbConnection.connect();
    console.log("\uD83D\uDE80  Server ready at " + url);
    var clockIntegrator = new clockIntegrator_scheduler_1.ClockIntegratorScheduler();
    console.log("Starting scheduler task");
    node_schedule_1.scheduleJob('*/5 * * * * *', function () {
        clockIntegrator.execute().then(function () {
            console.log("Updated active clocks information for all users");
        }).catch(function (err) {
            console.log("Error updating clocks information " + err);
        });
    });
});
//# sourceMappingURL=index.js.map