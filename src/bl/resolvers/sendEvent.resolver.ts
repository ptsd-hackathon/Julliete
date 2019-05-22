import {GQLLocationInput, GQLLogType} from "../../../graphql-types";

export function sendEvent(root: any, {userEmail, appToken, location, eventDescription, logType}: {
    userEmail: string, appToken: string, location: GQLLocationInput, eventDescription: string,
    logType: GQLLogType
}): boolean {
    return true;
}