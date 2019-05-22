import {GQLLocationInformation, GQLLocationInput} from "../../../graphql-types";

export function sendUserLocation(root: any, {userEmail, appToken, location}: {
    userEmail: string, appToken: string, location: GQLLocationInput
}): GQLLocationInformation | null {
    return null;
}