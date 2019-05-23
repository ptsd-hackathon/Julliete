import {EventsRepository} from "../../dal/repositories/eventsRepository";
import {EventDB} from "../../dal/types/event";
import {UsersRepository} from "../../dal/repositories/usersRepository";
import { MedicalStatsDB } from "../../dal/types/medicalStats";
import {GQLCoordinates, GQLWeather} from "../../../graphql-types";

export class EventsService {
    public async addNewEvent(userEmail: string, appToken: string, logType: string,
                             eventDescription: string, location?: { lat: number, long: number }, medicalStats?: MedicalStatsDB[], locationData?: LocationData) {
        await this.validateUserAndApp(userEmail, appToken);
        let eventsRepository = new EventsRepository();
        // @ts-ignore
        let event: EventDB = {
            userEmail: userEmail,
            appToken: appToken,
            logType: logType,
            eventDescription: eventDescription,
            location: {
                coordinates: {
                    lat: location == undefined ? null : location.lat,
                    long: location == undefined ? null : location.long
                },
                crowdednessLevel: locationData == undefined ? null : locationData.crowdedness,
                pointsOfInterests: locationData == undefined ? null : locationData.pointsOfInterest,
                geocodedAddress: locationData == undefined ? null : locationData.address,
                weather: locationData == undefined ? null : locationData.weather
            },
            timestamp: new Date(),
            medicalStats: medicalStats == undefined ? null : medicalStats
        };

        try {
            await eventsRepository.save(event);
        } catch (e) {
            console.log("error saving event " + e);
            throw e;
        }
    }


    private async validateUserAndApp(userEmail: string, appToken: string) {
        let usersRepository = new UsersRepository();
        let findByEmailAndAppToken = await usersRepository.findByEmailAndAppToken(userEmail, appToken);
        if (!findByEmailAndAppToken) {
            let message = "trying to save event for an unidentified user " + userEmail + " under app token " + appToken;
            console.log(message);
            throw new Error(message);
        }
    }
}