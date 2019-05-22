import {GQLLocationInput, GQLLogType} from "../../../graphql-types";
import {EventsService} from "../services/events.service";
import {LocationInformation} from "../services/location/locationLogic/location-information";


export async function sendEvent(root: any, {userEmail, appToken, language, locationCoordinates, eventDescription, logType}: {
    userEmail: string, appToken: string, language: string, locationCoordinates: GQLLocationInput, eventDescription: string,
    logType: GQLLogType
}): Promise<boolean> {
    let eventsService = new EventsService();
    let locationData = await LocationInformation.getLocationData(locationCoordinates.lat, locationCoordinates.long, language);
    await eventsService.addNewEvent(userEmail, appToken, logType, eventDescription, locationCoordinates, locationData);
    console.log("Saved new event");
    return true;
}