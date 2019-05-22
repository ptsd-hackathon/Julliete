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
            lat: number,
            long: number
        },
        weather: {temperature: string, description:string},
        geocodedAddress: string,
        crowdednessLevel: number,
        pointsOfInterests: Array<string>,
    }
    medicalStats: MedicalStatsDB[],
    timestamp: Date
}

const EventSchema: Schema = new Schema({
    userEmail: String,
    appToken: String,
    eventDescription: String,
    logType: String,
    location: {
        coordinates: {
            lat: Number,
            long: Number
        },
        weather: Schema.Types.Mixed,
        geocodedAddress: Schema.Types.Mixed,
        crowdednessLevel: Schema.Types.Mixed,
        pointsOfInterests: [Schema.Types.Mixed],
    },
    medicalStats: [MedicalStatsSchemaConst],
    description: String,
    timestamp: Date
});

export const Event = model<EventDB>("Event", EventSchema);

