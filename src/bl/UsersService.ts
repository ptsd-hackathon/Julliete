import {GQLUser, GQLUserInformation, GQLUserRegistrationInput} from "../../graphql-types";

export class UsersService {
    // @ts-ignore
    public users: [{ email: string, password: string, userInformation: GQLUserInformation }] = [];

    getUserByEmail(email: string) {
        return this.users.filter((user: GQLUserRegistrationInput) => user.email === email)[0];
    }

    register(user: GQLUserRegistrationInput): boolean {
        this.users.forEach(function (currentUser: GQLUserRegistrationInput) {
            if (currentUser.email == user.email) {
                throw new Error("User already exists");
            }
        });

        let userForDb: any = {
            email: user.email,
            password: user.password,
            userInformation: {privateName: user.privateName, lastName: user.lastName}
        };
        this.users.push(userForDb);

        return true;
    }

    login(email: string, password: string): boolean {
        let areCredentialsOk: boolean = false;
        this.users.forEach(function (currentUser: GQLUserRegistrationInput) {
            if (currentUser.email == email && currentUser.password == password) {
                areCredentialsOk = true;
                return;
            }
        });
        return areCredentialsOk;
    }
}
