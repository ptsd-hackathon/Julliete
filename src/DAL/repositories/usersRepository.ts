import {User, UserDB} from "../types/user";

export class UsersRepository {
    public findByEmail(email: string) {
        return User.findOne({'email': email});
    }

    public save(user: UserDB) {
        return new User(user).save();
    }
}