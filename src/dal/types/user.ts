import * as mongoose from "mongoose";
import {model, Schema} from "mongoose";

export interface UserDB extends mongoose.Document {
    email: string,
    appToken: string,
    metadata: {
        fullName: string | undefined,
        gender: string | undefined,
        dateOfBirth: Date,
        address: { state: string, city: string, street: string, apartment: string } | undefined,
        medicalInformation: any
    }
}

const UserSchema: Schema = new Schema({
    email: String,
    appToken: String,
    metadata: {
        fullName: String,
        gender: String,
        dateOfBirth: Date,
        address: {
            state: String,
            city: String,
            street: String,
            apartment: String
        },
        medicalInformation: Schema.Types.Mixed
    }
});

export const User = model<UserDB>("User", UserSchema);