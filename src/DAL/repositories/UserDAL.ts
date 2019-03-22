import {dbConnection} from "../connection";
import {User, UserDB} from "../types/User";

export class UserDAL {
    private connection: dbConnection;

    constructor() {
        this.connection = new dbConnection();
    }

    public findByEmail(email: string) {
        return User.findOne({'email': email});
    }

    public getUserByEmailAndPassword(email: string, password: string) {
        return User.findOne({'email': email, 'password': password});
    }

    public getAllUsers() {
        return User.find();
    }

    public getUserById(id: string) {
        return User.findById(id);
    }

    public update(id: string, user: any) {
        return User.findByIdAndUpdate(id, user);
    }

    public deleteUserById(id: string) {
        return User.deleteOne({_id: id});
    }

    public save(user: UserDB) {
        return new User(user).save();
    }
}