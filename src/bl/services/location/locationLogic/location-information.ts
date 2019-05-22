import {PlacesNearBy} from "./places-near-by";
import {LocationAddress} from "./location-address";
import {weather} from "./weather";
import {LocationUtils} from "./location-utils";

export class LocationInformation {
    static async getLocationData(apiKey: string, lat: number, lng: number, language:string, radius: number): Promise<LocationData> {
        let requestNearByPlaces = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&key=${apiKey}&language=${language}`;
        let resultNearByPlaces = await LocationUtils.httpGet(requestNearByPlaces);
        return await {
            address: await LocationAddress.getAddress(apiKey, lat, lng, language),
            crowdedness: await PlacesNearBy.getSeverityOfLocation(resultNearByPlaces, apiKey),
            pointsOfInterest: await PlacesNearBy.getNearByPlacesNames(resultNearByPlaces),
            weather: await weather.handleWeather(lng, lat, language)
        }
    }
}

