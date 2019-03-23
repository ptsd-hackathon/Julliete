import {connect} from 'mongoose';

export class dbConnection {
    constructor() {
        let uri = 'mongodb://132.145.207.51/juliette';
        connect(uri, {useNewUrlParser: true}, (err) => {
            if (err) {
                console.log(err.message);
                console.log(err);
            } else {
                console.log('Connected to MongoDb');
            }
        });
    }
}
