import {GQLUserInput} from "../../graphql-types";

class UserRegistratio0n{
    // @ts-ignore
    usersFromDb: [GQLUserInput] = [];
    
    createNewUser(user: GQLUserInput){
        this.usersFromDb.forEach(function (currentUser : GQLUserInput) {
            if (currentUser.email == user.email){
                return "The user is already exist";
            }
        });
        this.usersFromDb.push(user);
    }

    checkRegisterDetails(user: GQLUserInput){
        this.usersFromDb.forEach(function (currentUser : GQLUserInput) {
            if (currentUser.email == user.email) {
                if (currentUser.password == user.password) {
                    return true;
                }
            }
        });
        return false;
    }
}
