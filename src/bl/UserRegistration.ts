import {GQLUserRegistrationInput} from "../../graphql-types";
import {UserDAL} from "../DAL/repositories/UserDAL";

export class UserRegistration {
    public userDAL: UserDAL;

    constructor(userDAL: UserDAL) {
        this.userDAL = userDAL;
    }

    registerUser(user: GQLUserRegistrationInput): boolean {

        this.userDAL.getUserByEmail(user.email).then((response: any) => {
            if (response != null) {
                console.log(response);
                throw new Error("User already exists");
            }

            this.userDAL.save(user).then((response: any) => {
                console.log(response)
            }).catch((err: any) => console.log(err));
            return true;
        }).catch((err) => console.log(err));
        return false;
    }

    login(email: string, password: string): boolean {
        // let areCredentialsOk: boolean = false;
        // this.usersFromDb.forEach(function (currentUser: GQLUserRegistrationInput) {
        //     if (currentUser.email == email && currentUser.password == password) {
        //         areCredentialsOk=true;
        //         return;
        //     }
        // });
        // return areCredentialsOk;
        return true;
    }
}
