import {User, UserDB} from "../types/user";

export class UsersRepository {
    public async findByEmailAndAppToken(email: string, appToken: string): Promise<UserDB | null> {
        return await User.findOne({'email': email, 'appToken': appToken});
    }

    public async findAll(): Promise<UserDB[] | null> {
        return await User.find({});
    }

    public save(user: UserDB) {
        return new User(user).save();
    }
}