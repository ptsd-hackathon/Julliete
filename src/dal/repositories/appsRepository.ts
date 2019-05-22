import {App, AppDB} from "../types/application";

export class AppsRepository {
    public async save(app: AppDB) {
        return new App(app).save();
    }

    public async findByName(name: string) {
        return App.findOne({appName: name});
    }

    public async findByToken(appToken: string) {
        return App.findById(appToken);
    }
}