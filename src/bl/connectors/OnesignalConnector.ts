import axios from "axios";

export class OnesignalConnector {
    private url: string = "https://onesignal.com/api/v1/notifications";

    send(alertMessage: string, userOneSignalId: string) {
        let message = {
            app_id: "de69c52c-08b7-4984-8ecf-9f3eec316948",
            contents: {"en": alertMessage},
            include_player_ids: [userOneSignalId]
        };

        let token = 'N2JiYzMwNDMtNzBkNi00NzU2LWFhNWQtYWYyMWM3MDBkZWI4';
        let config = {headers: {Authorization: 'Basic ' + token}};

        axios.post(this.url, message, config)
            .then((res) => {
                console.log("successfully called one signal");
                console.log(res.data);
            }).catch(err => console.log(err.response));
    }
}