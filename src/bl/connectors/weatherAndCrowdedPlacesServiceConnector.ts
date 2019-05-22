import axios, {AxiosPromise} from "axios";

export interface WeatherCondition {
    currentWeatherType: string,
    severity: number
}

export interface PlacesCondition {
    currentPlaceType: string,
    severity: number
}

export class WeatherAndCrowdedPlacesServiceConnector {
    url: string = "http://129.213.103.20:3000";

    getCrowdedPlaces(coords: { lat: number, long: number }, places: (string | null)[] | undefined): AxiosPromise<PlacesCondition> {
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

    getWeathersSeverity(coords: { lat: number, long: number }, weatherTriggers: [{ type: string, rate: number }]): AxiosPromise<WeatherCondition> {
        weatherTriggers = [{type: "snow", rate: 5}];
        return axios.post(this.url + '/weathers', {coords: coords, weatherTriggers: weatherTriggers});
    }
}