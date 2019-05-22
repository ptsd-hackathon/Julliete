import {AppsRepository} from "../../dal/repositories/appsRepository";
import {AppDB} from "../../dal/types/application";
import {GQLAppToken} from "../../../graphql-types";

export async function registerApp(root: any, {appName}: {
    appName: string
}): Promise<GQLAppToken> {
    let appsRepository = new AppsRepository();

    let foundAppDB: AppDB | null;
    try {
        foundAppDB = await appsRepository.findByName(appName);
        if (foundAppDB) {
            throw new Error("app name is already registered");
        }
    } catch (e) {
        console.log("error finding app " + appName);
        throw e;
    }

    // @ts-ignore
    let app: AppDB = {appName: appName};
    try {
        let appDBPromise = await appsRepository.save(app);
        console.log("new App saved with id " + appDBPromise.id);
        return {token: appDBPromise.id};
    } catch (e) {
        console.log("error creating app " + e);
        throw e;
    }
}