import {EventsRepository} from "../../dal/repositories/eventsRepository";
import {EventDB} from "../../dal/types/event";
import {UsersRepository} from "../../dal/repositories/usersRepository";

export class EventsService {
    public async addNewEvent(userEmail: string, appToken: string, logType: string,
                             eventDescription: string, location: { lat: number, long: number },locationData:LocationData) {
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
                    latitude: location.lat,
                    longitude: location.long
                },
                crowdedness: locationData.crowdedness,
                pointsOfInterests: locationData.pointsOfInterest,
                geocodedLocation: locationData.address,
                weather: locationData.weather
            },
            timestamp: new Date()
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