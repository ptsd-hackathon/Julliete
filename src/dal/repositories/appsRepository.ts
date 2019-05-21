import {App, AppDB} from "../types/application";

export class EventsRepository {
    public save(app: AppDB) {
        return new App(app).save();
    }
}