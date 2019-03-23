import axios, {AxiosPromise} from "axios";

export interface NewsSeverityCondition {
    severeNewsArray: [{ title: string, url: string, severity: number }]
}

export class NewsSeverityServiceConnector {
    private url: string = 'http://132.145.145.146:3000/updateGpsUser';

    updateUserLocation(email: string, coords: { lat: number, long: number }) {
        axios.post('http://132.145.145.146:3000/updateGpsUser',
            {user: email, coord: coords})
            .then((res) => {
                console.log(res.data);
                console.log("success calling echo");
            });
    }

    getNewsSeverityCondition(coords: { lat: number, long: number }): AxiosPromise<NewsSeverityCondition> {
        return axios.post(this.url, {coords: coords});
    }
}