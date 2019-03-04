import {dbConnection} from "../connection";

export class UserDAL {

    private connection: dbConnection;

    constructor() {
        this.connection = new dbConnection();
    }

    public getUserByEmail(email: any) {
        return this.connection.findByEmail(email);
    }

    public getUserByEmailAndPassword(email: any, password: any) {
        return this.connection.getUserByEmailAndPassword(email, password);
    }

    public getAllUsers() {
        return this.connection.getAllUsers();
    }

    public save(user : any) {
        return this.connection.addUser(user);
    }
}