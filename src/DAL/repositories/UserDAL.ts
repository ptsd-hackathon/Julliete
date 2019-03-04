import {dbConnection} from "../connection";

export class UserDAL {

    private connection: dbConnection;

    constructor() {
        this.connection = new dbConnection();
    }

    public getUserByEmail(email: any) {
        return this.connection.findByEmail(email);
    }

    public getAllUsers() {
        return this.connection.getAllUsers();
    }

    public save(user : any) {
        return this.connection.addUser(user);
    }
}