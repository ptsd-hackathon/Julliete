import axios from "axios";

export class LimaConnector {
    url: string = "http://129.213.103.20:3000";

    getCrowdedPlaces(coords: { lat: number, long: number }, places: (string | null)[] | undefined) {
        places = ["airport", "political"];
        let placesString = places ? places.join() : "";
        console.log(placesString);
        return axios.get(this.url + '/crowdedPlaces?lat=' + coords.lat + '&lon=' + coords.long +
            '&triggeringPlacesTypes=' + placesString);
    }

    getWeatherPreferences() {
        return axios.get(this.url + '/weatherPreferences');
    }

    getPlaceTypes() {
        return axios.get(this.url + "/placesTypes");
    }
}