import {Schema} from "mongoose";

export const UserSchema: Schema = new Schema({
    email: String,
    password: String,
    privateName: String,
    lastName: String
});
