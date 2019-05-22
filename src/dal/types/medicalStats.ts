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
    MAPrs: number,
    svr: number,
    cardiacOutput: number,
    battery: number,
    diastolicBloodPressure: number,
    temperature: number,
    sweat: number,
    calories: number
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
    MAPrs: Number,
    svr: Number,
    cardiacOutput: Number,
    battery: Number,
    diastolicBloodPressure: Number,
    temperature: Number,
    sweat: Number,
    calories: Number
});

export const MedicalStats = model<MedicalStatsDB>("MedicalStats", MedicalStatsSchema);
export const MedicalStatsSchemaConst = MedicalStatsSchema;

