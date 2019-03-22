import {
    GQLLocationInput,
    GQLUserInformation,
    GQLUserInformationInput,
    GQLUserRegistrationInput
} from "../../graphql-types";
import {UserDAL} from "../DAL/repositories/UserDAL";
import {UserDB} from "../DAL/types/User";

export class UsersService {
    // @ts-ignore
    public users: [{ email: string, password: string, userInformation: GQLUserInformation }] = [];
    public userDAL: UserDAL;

    constructor(userDAL: UserDAL) {
        this.userDAL = userDAL;
    }

    getUserByEmail(email: string) {
        return this.userDAL.findByEmail(email);
    }

    updateUserLocation(email: string, location: GQLLocationInput) {
        return this.userDAL.findByEmail(email).then((user: UserDB | null) => {
            if (!user) {
                throw new Error("No user found");
            }
            let expiryDate = new Date();
            expiryDate.setMinutes(expiryDate.getMinutes() + 30);
            user.lastLocation = {longitude: location.long, latitude: location.lat, expires: expiryDate};
            return this.userDAL.save(user).then(() => {
                console.log("user " + email + " location updated successfully");
                return true;
            }).catch(err => {
                throw new Error(err);
            });
        }).catch(err => {
            throw new Error(err);
        });
    }

    register(user: GQLUserRegistrationInput) {
        return this.userDAL.findByEmail(user.email).then((response: any) => {
            if (response != null) {
                throw new Error("user with this email already exists");
            }
            let userDB = this.createUserDB(user);
            return this.userDAL.save(userDB)
                .then(() => {
                    return true;
                }).catch((err: any) => {
                    throw new Error(err)
                });
        }).catch((err) => {
            throw new Error(err)
        });
    }

    login(email: string, password: string) {
        return this.userDAL.getUserByEmailAndPassword(email, password).then((response: any) => {
                if (response != null) {
                    return true;
                }
                return false;
            }
        ).catch((err) => console.log(err));
    }

    setUserInformation(email: string, userInformation: GQLUserInformationInput) {
        return this.userDAL.findByEmail(email).then((user: UserDB | null) => {
            if (user == null) {
                throw new Error("No user found");
            }
            user.address = userInformation.address ? {
                state: userInformation.address.state,
                apartment: userInformation.address.apartment,
                city: userInformation.address.city,
                street: userInformation.address.street
            } : undefined;
            // @ts-ignore
            user.emergencyContacts = userInformation.emergencyContacts;
            // @ts-ignore
            user.familyStatus = userInformation.familyStatus;
            user.medicalInformation = {
                initialPanicAttackDate: userInformation.initialPanicAttackDate,
                sleep: userInformation.sleep,
                traumaType: userInformation.traumaType,
                isSmoking: userInformation.isSmoking,
                isTakingDrugs: userInformation.medicalInformation ? userInformation.medicalInformation.isTaking : undefined,
                drugs: userInformation.medicalInformation ? userInformation.medicalInformation.drugs : undefined,
                stressHours: userInformation.stressHours,
                // @ts-ignore
                stressfullPlaces: userInformation.stressfullPlaces,
                weatherTriggers: userInformation.weatherTriggers
            };
            this.userDAL.save(user).then(() => {
                console.log("User with email " + user.email + " has been updated successfully");
                return true;
            }).catch(err => {
                throw new Error(err);
            })
        }).catch(err => {
            throw new Error(err);
        })
    }

    private createUserDB(user: GQLUserRegistrationInput): UserDB {
        console.log("date of birth " + user.dateOfBirth);
        // @ts-ignore
        return {
            email: user.email,
            password: user.password,
            privateName: user.privateName,
            lastName: user.lastName,
            gender: user.gender,
            dateOfBirth: user.dateOfBirth,
            phoneNumber: user.phoneNumber
        };
    }
}
