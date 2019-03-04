import {connect, model} from 'mongoose';
import {UserSchema} from "./types/User";

export const User = model("User", UserSchema);

export class dbConnection {
    constructor() {
        let uri = 'mongodb://132.145.207.51/juliette';
        connect(uri, {useNewUrlParser: true}, (err) => {
            if (err) {
                console.log(err.message);
                console.log(err);
            }
            else {
                console.log('Connected to MongoDb');
            }
        });
    }

    public addUser(user: any) {
        return new User(user).save().then((x: any) => {
            return x;
        });
    }

    public getAllUsers() {
        return User.find().then(users => {
            return users;
        });
    }

    public getUserById(id: string) {
        return User.findById(id).then(users => {
            return users;
        });
    }

    public deleteUserById(id: string) {
        return User.deleteOne({_id: id}).then(users => {
            return users;
        });
    }

    public updateUser(id: string, u: any) {
        return User.findByIdAndUpdate(id, u).then(users => {
            return users;
        });
    }

    public findByEmail(email: string) {
        return User.findOne({'email': email}).then(user => {
            return user;
        });
    }
}
