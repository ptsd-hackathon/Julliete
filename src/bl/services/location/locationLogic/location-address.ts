import {LocationUtils} from "./location-utils";

export class LocationAddress {
    static async getAddress(apiKey: string, lat: number, lng: number, language: string): Promise<string> {
        let requestString = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}&language=${language}`;
        let result:any = await LocationUtils.httpGet(requestString);
        if (result.results){
            if (result.results[0]) {
                return result.results[0].formatted_address;
            }
        }
        return ""
    }
}