import {model, Schema} from "mongoose";

export interface UserDB {
    email: string,
    password: string,
    privateName: string,
    lastName: string,
    gender: string,
    dateOfBirth: Date,
    phoneNumber: string | null,
    address: { state: string, city: string, street: string, apartment: string } | null,
    emergencyContacts: [{ phoneNumber: string, name: string }] | null,
    familyStatus: { isMarried: boolean, numberOfChildren: number } | null,
    medicalInformation: {
        initialPanicAttackDate: Date | null,
        traumaType: string | null,
        sleep: { bedHour: number, wakingHour: number } | null,
        isSmoking: boolean | null,
        isTakingDrugs: boolean | null,
        drugs: [string] | null,
        stressHours: [number] | null,
        stressFullPlaces: [string] | null,
        weatherTriggers: [{ type: string, rate: number }] | null
    } | null,
    lastLocation: { latitude: number, longitude: number, expires: Date } | null
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
    lastLocation: {latitude: Number, longitude: Number, expires: Date}
});

export const User = model("User", UserSchema);

