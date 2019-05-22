import {GQLLocationInformation, GQLLocationInput} from "../../../graphql-types";
import {EventsService} from "../services/events.service";

export async function sendUserLocation(root: any, {userEmail, appToken, location}: {
    userEmail: string, appToken: string, location: GQLLocationInput
}): Promise<GQLLocationInformation | null> {
    let eventsService = new EventsService();
    await eventsService.addNewEvent(userEmail, appToken, "REPEATABLE", "Standard Location Input",
        location);
    console.log("Saved new event");
    return {crowdednessLevel: "5", geocodedAddress: "Adsf", pointsOfInterests: [], weather: "adsf"};
}