import {GQLUserEvent} from "../../../graphql-types";
import {EventsRepository} from "../../dal/repositories/eventsRepository";

export async function userEvents(root: any, {userEmail, appToken, fromDate, toDate}: {
    userEmail: string, appToken: string, fromDate: Date, toDate: Date
}): Promise<GQLUserEvent[] | null> {
    let eventsRepository = new EventsRepository();
    try {
        console.log("fetched all events for user " + userEmail + " and app token " + appToken + " from date " + fromDate + " to date " + toDate);
        // @ts-ignore
        return await eventsRepository.findAllByUserAndAppTokenAndBetweenDates(userEmail, appToken, fromDate, toDate);
    } catch (e) {
        console.log("error while finding all events for a specific user and app token between the dates: " + fromDate + " , " + toDate);
        throw e;
    }
}