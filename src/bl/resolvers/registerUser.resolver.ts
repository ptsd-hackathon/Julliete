import {GQLUserMetadataInput} from "../../../graphql-types";
import {UsersRepository} from "../../dal/repositories/usersRepository";
import {UserDB} from "../../dal/types/user";
import {AppsRepository} from "../../dal/repositories/appsRepository";

export async function registerUser(root: any, {userEmail, appToken, clockSerial, userMetadata}:
    { userEmail: string, appToken: string, clockSerial: string, userMetadata: GQLUserMetadataInput }): Promise<boolean> {
    let appsRepository = new AppsRepository();
    let appDBPromise = await appsRepository.findByToken(appToken);
    if (!appDBPromise) {
        console.log("Cannot identify app token " + appToken);
        throw new Error("Cannot identify app token");
    }
    let usersRepository = new UsersRepository();
    let foundUserDB = await usersRepository.findByEmailAndAppToken(userEmail, appToken);
    if (foundUserDB) {
        console.log("User with email " + userEmail + " already exists for app token " + appToken);
        throw new Error("User with email " + userEmail + " already exists");
    }
    // @ts-ignore
    let userDB: UserDB = {
        email: userEmail,
        appToken: appToken,
        clockSerial: clockSerial,
        metadata: {
            fullName: userMetadata.fullName,
            gender: userMetadata.gender,
            dateOfBirth: userMetadata.dateOfBirth,
            address: userMetadata.address,
            medicalInformation: userMetadata.medicalInformation
        }
    };
    await usersRepository.save(userDB);

    console.log("successfully registered user with email " + userEmail);
    return true;
}