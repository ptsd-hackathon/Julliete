import {GQLUser, GQLUserInformation, GQLUserRegistrationInput} from "../../graphql-types";
import {UserDAL} from "../DAL/repositories/UserDAL";
import {isBoolean} from "util";

export class UsersService {
    // @ts-ignore
    public users: [{ email: string, password: string, userInformation: GQLUserInformation }] = [];
    public userDAL: UserDAL;

    constructor(userDAL: UserDAL) {
        this.userDAL = userDAL;
    }

    getUserByEmail(email: string) {
        return this.users.filter((user: GQLUserRegistrationInput) => user.email === email)[0];
    }

    register(user: GQLUserRegistrationInput): boolean {

        this.userDAL.getUserByEmail(user.email).then((response: any) => {
            if (response != null) {
                console.log(response);
                throw new Error("User already exists");
            }
            this.userDAL.save(user).then((response: any) => {
            }).catch((err: any) => console.log(err));
            return true;
        }).catch((err) => console.log(err));
        return false;
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
}
