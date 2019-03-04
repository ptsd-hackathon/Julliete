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

    register(user: GQLUserRegistrationInput) {

        return this.userDAL.getUserByEmail(user.email).then((response: any) => {
            if (response != null) {
                return false;
            }
            return this.userDAL.save(user).then((response: any) => {
                return true;
            }).catch((err: any) => console.log(err));
        }).catch((err) => console.log(err));
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
