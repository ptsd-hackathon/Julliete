import * as mongoose from "mongoose";
import {model, Schema} from "mongoose";

export interface MedicalStatsDB extends mongoose.Document {
    breathsRate: number,
    protocolNumber: number,
    systolicBloodPressure: number,
    strokeVolume: any

}

const MedicalStatsSchema: Schema = new Schema({
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

export const MedicalStats = model<MedicalStatsDB>("MedicalStats", MedicalStatsSchema);

