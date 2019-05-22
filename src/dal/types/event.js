"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var medicalStats_1 = require("./medicalStats");
var EventSchema = new mongoose_1.Schema({
    userEmail: String,
    appToken: String,
    eventDescription: String,
    logType: String,
    location: {
        coordinates: {
            latitude: Number,
            longitude: Number
        },
        weather: mongoose_1.Schema.Types.Mixed,
        geocodedLocation: mongoose_1.Schema.Types.Mixed,
        crowdedness: mongoose_1.Schema.Types.Mixed,
        pointsOfInterests: [mongoose_1.Schema.Types.Mixed],
    },
    medicalStats: [medicalStats_1.MedicalStatsSchemaConst],
    description: String,
    timestamp: Date
});
exports.Event = mongoose_1.model("Event", EventSchema);
//# sourceMappingURL=event.js.map