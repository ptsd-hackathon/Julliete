import axios from "axios";

export class EchoConnector {
    connect(email: string, coords: { lat: number, long: number }) {
        axios.post('http://132.145.145.146:3000/updateGpsUser',
            {user: email, coord: coords})
            .then((res) => {
                console.log(res.data);
                console.log("success calling echo");
            });
    }
}