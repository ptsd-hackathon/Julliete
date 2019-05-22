import {GQLLocationInformation, GQLLocationInput} from "../../../graphql-types";
import {EventsService} from "../services/events.service";
import {LocationInformation} from "../services/location/locationLogic/location-information";

export async function sendUserLocation(root: any, {userEmail, appToken, language, locationCoordinates}: {
    userEmail: string, appToken: string, language: string, locationCoordinates: GQLLocationInput
}): Promise<GQLLocationInformation> {
    let eventsService = new EventsService();
    let locationData = await LocationInformation.getLocationData(locationCoordinates.lat, locationCoordinates.long, language);
    console.log("Saved new event");
    await eventsService.addNewEvent(userEmail, appToken, "REPEATABLE", "Standard Location Input",
        locationCoordinates, locationData);
    return await {
        crowdednessLevel: locationData.crowdedness,
        geocodedAddress: locationData.address,
        pointsOfInterests: locationData.pointsOfInterest,
        weather: locationData.weather,
        coordinates: locationCoordinates
    };
}