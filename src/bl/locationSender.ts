import {NewsSeverityServiceConnector} from "./connectors/newsServerityService.connector";
import {WeatherAndCrowdedPlacesServiceConnector} from "./connectors/weatherAndCrowdedPlacesServiceConnector";
import {GQLUser} from "../../graphql-types";

export class LocationSender {
    private echoConnector: NewsSeverityServiceConnector;
    private limaConnector: WeatherAndCrowdedPlacesServiceConnector;

    constructor(echoConnector: NewsSeverityServiceConnector, limaConnector: WeatherAndCrowdedPlacesServiceConnector) {
        this.echoConnector = echoConnector;
        this.limaConnector = limaConnector;
    }

    sendLocation(email: string, coords: { lat: number, long: number }, user: GQLUser) {
        this.echoConnector.updateUserLocation(email, coords);
        let places = user.userInfo ? user.userInfo.stressfullPlaces : [];
        return this.limaConnector.getCrowdedPlaces(coords, places)
    }
}