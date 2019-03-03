import { GQLUserRegistrationInput} from "../../graphql-types";

export class UserRegistration {
    // @ts-ignore
    public usersFromDb: [GQLUserInput] = [];
    public response: any;

    registerUser(user: GQLUserRegistrationInput): boolean {
        this.usersFromDb.forEach(function (currentUser: GQLUserRegistrationInput) {
            if (currentUser.email == user.email) {
                throw new Error("User already exists");
            }
        });

        this.usersFromDb.push(user);

        return true;
    }

    login(email: string, password: string): boolean {
        let areCredentialsOk: boolean = false;
        this.usersFromDb.forEach(function (currentUser: GQLUserRegistrationInput) {
            if (currentUser.email == email && currentUser.password == password) {
                areCredentialsOk=true;
                return;
            }
        });
        return areCredentialsOk;
    }
}
