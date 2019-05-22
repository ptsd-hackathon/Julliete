import {Event, EventDB} from "../types/event";

export class EventsRepository {
    public async save(event: EventDB) {
        return new Event(event).save();
    }

    public async findAllByUserAndAppTokenAndBetweenDates(userEmail: string, appToken: string, fromDate: Date, toDate: Date) {
        return Event.find({
            userEmail: userEmail, appToken: appToken,
            timestamp: {"$gte": fromDate, "$lt": toDate}
        });
    }
}