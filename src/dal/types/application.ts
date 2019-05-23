import * as mongoose from "mongoose";
import {model, Schema} from "mongoose";

export interface AppDB extends mongoose.Document {
    appName: string
}

const AppSchema: Schema = new Schema({
    appName: String
});


export const App = model<AppDB>("App", AppSchema);

