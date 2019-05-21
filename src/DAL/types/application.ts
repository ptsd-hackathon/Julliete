import * as mongoose from "mongoose";
import {model, Schema} from "mongoose";

export interface AppDB extends mongoose.Document {
    googleApiKey: string,
    appName: string
}

const AppSchema: Schema = new Schema({
    googleApiKey: String,
    appName: String
});

export const App = model<AppDB>("App", AppSchema);

