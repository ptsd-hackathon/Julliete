import {GQLLocationInformation, GQLLocationInput} from "../../../graphql-types";
import {EventsService} from "../services/events.service";
import {LocationInformation} from "../services/location/locationLogic/location-information";

export async function sendUserLocation(root: any, {userEmail, appToken,language, location}: {
    userEmail: string, appToken: string, language: string, location: GQLLocationInput
}): Promise<GQLLocationInformation> {
    let eventsService = new EventsService();
    let apikey = 'AIzaSyAxm42yuheNNx0znh7x4qAExlu5MMsnpPY';
    let radius = 100;
    let locationData = await LocationInformation.getLocationData(apikey, location.lat, location.long, language, radius);
    console.log("Saved new event");
    await eventsService.addNewEvent(userEmail, appToken, "REPEATABLE", "Standard Location Input",
        location, locationData);
    return await {
        crowdednessLevel: locationData.crowdedness,
        geocodedAddress: locationData.address,
        pointsOfInterests: locationData.pointsOfInterest,
        weather: locationData.weather,
        coordinates: location
    };
}