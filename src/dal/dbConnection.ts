import {connect} from 'mongoose';

export class DBConnection {
    private uri: string = "mongodb://132.145.207.51/juliette";

    public connect(): void {
        connect(this.uri, {useNewUrlParser: true}, (err) => {
            if (err) {
                console.log(err.message);
                console.log(err);
            } else {
                console.log('Connected to MongoDb');
            }
        });
    }
}
