import {model, Schema} from "mongoose";

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

