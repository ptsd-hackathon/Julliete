import axios from "axios";

export class LimaConnector {
    url: string = "http://129.213.103.20:3000";

    getCrowdedPlaces(coords: { lat: number, long: number }) {
        axios.get(this.url + '/crowdedPlaces?lat="' + coords.lat + '"&lng="' + coords.long + '"&triggeringPlacesTypes=' + 'school,' + 'zoo').then((response: any) => {
            console.log("success calling Lima - Crowded Places");
            console.log(response.data);
        }).catch((err) => console.log(err.response));
    }

    getWeatherPreferences() {
        console.log("gettinggg");
        return axios.get(this.url + '/weatherPreferences');
    }
}