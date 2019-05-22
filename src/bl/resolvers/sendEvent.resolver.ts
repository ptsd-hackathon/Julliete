import {GQLLocationInput, GQLLogType} from "../../../graphql-types";
import {EventsService} from "../services/events.service";


export async function sendEvent(root: any, {userEmail, appToken, location, locationData, eventDescription, logType}: {
    userEmail: string, appToken: string, location: GQLLocationInput,locationData:LocationData, eventDescription: string,
    logType: GQLLogType
}): Promise<boolean> {
    let eventsService = new EventsService();
    await eventsService.addNewEvent(userEmail, appToken, logType, eventDescription, location,locationData);
    console.log("Saved new event");
    return true;
}