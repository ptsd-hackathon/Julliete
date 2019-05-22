"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var MedicalStatsSchema = new mongoose_1.Schema({
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
exports.MedicalStats = mongoose_1.model("MedicalStats", MedicalStatsSchema);
exports.MedicalStatsSchemaConst = MedicalStatsSchema;
//# sourceMappingURL=medicalStats.js.map