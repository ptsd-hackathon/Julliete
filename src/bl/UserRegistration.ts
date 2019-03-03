import {GQLUserInput} from "../../graphql-types";

export class UserRegistration {
    // @ts-ignore
    public usersFromDb: [GQLUserInput] = [];
    public response: any;

    registerUser(user: GQLUserInput): boolean {
        this.usersFromDb.forEach(function (currentUser: GQLUserInput) {
            if (currentUser.email == user.email) {
                throw new Error("User already exists");
            }
        });

        this.usersFromDb.push(user);

        return true;
    }

    login(email: string, password: string): boolean {
        let areCredentialsOk: boolean = false;
        this.usersFromDb.forEach(function (currentUser: GQLUserInput) {
            if (currentUser.email == email && currentUser.password == password) {
                areCredentialsOk=true;
                return;
            }
        });
        return areCredentialsOk;
    }
}
