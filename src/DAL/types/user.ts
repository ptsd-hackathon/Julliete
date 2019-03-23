import * as mongoose from "mongoose";
import {model, Schema} from "mongoose";
import {UserCondition} from "../../bl/services/userConditionService";

export interface UserDB extends mongoose.Document {
    email: string,
    password: string,
    privateName: string,
    lastName: string,
    gender: string,
    dateOfBirth: Date,
    phoneNumber?: string,
    address?: { state: string, city: string, street: string, apartment: string },
    emergencyContacts?: [{ phoneNumber: string, name: string }],
    familyStatus?: { isMarried: boolean, numberOfChildren: number },
    medicalInformation?: {
        initialPanicAttackDate?: Date,
        traumaType?: string,
        sleep?: { bedHour: number, wakingHour: number },
        isSmoking?: boolean,
        isTakingDrugs?: boolean,
        drugs?: [string],
        stressHours?: [number],
        stressFullPlaces?: [string],
        weatherTriggers?: [{ type: string, rate: number }]
    },
    lastLocation?: { latitude: number, longitude: number, expires: Date },
    userCondition?: UserCondition
}

const UserSchema: Schema = new Schema({
    email: String,
    password: String,
    privateName: String,
    lastName: String,
    gender: String,
    dateOfBirth: Date,
    phoneNumber: String,
    address: {state: String, city: String, street: String, apartment: String},
    emergencyContacts: [{phoneNumber: String, name: String}],
    familyStatus: {isMarried: Boolean, numberOfChildren: Number},
    medicalInformation: {
        initialPanicAttackDate: Date,
        traumaType: String,
        sleep: {bedHour: Number, wakingHour: Number},
        isSmoking: Boolean,
        isTakingDrugs: Boolean,
        drugs: [String],
        stressHours: [Number],
        stressFullPlaces: [String],
        weatherTriggers: [{type: String, rate: Number}]
    },
    lastLocation: {latitude: Number, longitude: Number, expires: Date},
    userCondition: {
        weatherCondition: {currentWeatherType: String, severity: Number}
        , placesCondition: {currentPlaceType: String, severity: Number}
        , newsCondition: {severeNewsArray: [{title: String, url: String, severity: Number}]}
    }
});

export const User = model<UserDB>("User", UserSchema);

