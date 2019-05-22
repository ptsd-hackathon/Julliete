import * as mongoose from "mongoose";
import {model, Schema} from "mongoose";
import {MedicalStatsDB, MedicalStatsSchemaConst} from "./medicalStats";

export interface EventDB extends mongoose.Document {
    userEmail: string,
    appToken: string,
    eventDescription: string,
    logType: string,
    location: {
        coordinates: {
            latitude: number | null,
            longitude: number | null
        },
        weather: any | null,
        geocodedLocation: any | null,
        crowdedness: any | null,
        pointsOfInterests: any[] | null,
    } | null,
    medicalStats: MedicalStatsDB[] | null,
    timestamp: Date
}

const EventSchema: Schema = new Schema({
    userEmail: String,
    appToken: String,
    eventDescription: String,
    logType: String,
    location: {
        coordinates: {
            latitude: Number,
            longitude: Number
        },
        weather: Schema.Types.Mixed,
        geocodedLocation: Schema.Types.Mixed,
        crowdedness: Schema.Types.Mixed,
        pointsOfInterests: [Schema.Types.Mixed],
    },
    medicalStats: [MedicalStatsSchemaConst],
    description: String,
    timestamp: Date
});

export const Event = model<EventDB>("Event", EventSchema);

