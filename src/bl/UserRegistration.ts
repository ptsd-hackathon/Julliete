import {GQLUserInput} from "../../graphql-types";
import {response} from "express";
import axios, { AxiosRequestConfig, AxiosPromise } from 'axios';

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
        axios.get('http://129.213.103.20:3000/crowdedPlaces?lat=32.093232&lng=34.865493').then((response :any) => {
            // if (response.data.message) {
                console.log(response);
                console.log(response.data);
                console.log(response.data.message);
            }).catch((x: any) => console.log(x));

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
