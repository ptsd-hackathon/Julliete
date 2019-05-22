import * as mongoose from "mongoose";
import {model, Schema} from "mongoose";

export interface EventDB extends mongoose.Document {
    userEmail: string,
    appToken: string,
    eventDescription: string,
    logType: string,
    location: {
        coordinates: {
            latitude: number,
            longitude: number
        },
        weather: {temperature: string, description:string},
        geocodedLocation: string,
        crowdedness: number,
        pointsOfInterests: Array<string>,
    }
    medicalStats: any,
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
    medicalStats: Schema.Types.Mixed,
    description: String,
    timestamp: Date
});

export const Event = model<EventDB>("Event", EventSchema);

