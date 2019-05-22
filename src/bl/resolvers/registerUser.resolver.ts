import {GQLUserMetadataInput} from "../../../graphql-types";

export function registerUser(root: any, {userEmail, appToken, clockSerial, userMetadata}:
    { userEmail: string, appToken: string, clockSerial: string, userMetadata: GQLUserMetadataInput }): boolean {
    return true;
}