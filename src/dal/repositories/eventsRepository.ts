import {Event, EventDB} from "../types/event";

export class EventsRepository {
    public save(event: EventDB) {
        return new Event(event).save();
    }
}