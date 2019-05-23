import {GQLLocationInput, GQLLogType} from "../../../graphql-types";
import {EventsService} from "../services/events.service";
import {LocationInformation} from "../services/location/locationLogic/location-information";


export async function sendEvent(root: any, {userEmail, appToken, language, locationCoordinates, eventDescription, logType, intensity}: {
    userEmail: string, appToken: string, language: string, locationCoordinates: GQLLocationInput, eventDescription: string,
    logType: GQLLogType, intensity: number
}): Promise<boolean> {
    let eventsService = new EventsService();
    let locationData = await LocationInformation.getLocationData(locationCoordinates.lat, locationCoordinates.long, language);
    await eventsService.addNewEvent(userEmail, appToken, logType, eventDescription, locationCoordinates, [], locationData, intensity);
    console.log("Saved new event");
    return true;
}