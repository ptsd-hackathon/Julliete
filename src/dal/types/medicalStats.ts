import * as mongoose from "mongoose";
import {model, Schema} from "mongoose";

export interface MedicalStatsDB extends mongoose.Document {
    breathRate: number,
    protocolNumber: number,
    systolicBloodPressure: number,
    strokeVolume: number,
    spo2: number,
    movement: number,
    cardiacIndex: number,
    heartbeatRateVariance: number,
    heartbeatRate: number,
    svr: number,
    cardiacOutput: number,
    diastolicBloodPressure: number,
    temperature: number,
    sweat: number,
    calories: number,
    timestamp: number
}

const MedicalStatsSchema: Schema = new Schema({
    breathRate: Number,
    protocolNumber: Number,
    systolicBloodPressure: Number,
    strokeVolume: Number,
    spo2: Number,
    movement: Number,
    cardiacIndex: Number,
    heartbeatRateVariance: Number,
    heartbeatRate: Number,
    svr: Number,
    cardiacOutput: Number,
    diastolicBloodPressure: Number,
    temperature: Number,
    sweat: Number,
    calories: Number,
    timestamp: Number
});

export const MedicalStats = model<MedicalStatsDB>("MedicalStats", MedicalStatsSchema);
export const MedicalStatsSchemaConst = MedicalStatsSchema;

