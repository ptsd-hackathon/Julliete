import {NewsSeverityServiceConnector} from "../connectors/newsServerityService.connector";
import {WeatherAndCrowdedPlacesServiceConnector} from "../connectors/weatherAndCrowdedPlacesServiceConnector";
import {BodyStatsServiceConnector} from "../connectors/bodyStatsService.connector";
import {UsersService} from "./usersService";
import {UserDB} from "../../DAL/types/user";

export class UserConditionService {
    private newsServerityServiceConnector: NewsSeverityServiceConnector;
    private weatherAndCrowdedPlacesServiceConnector: WeatherAndCrowdedPlacesServiceConnector;
    private bodyStatsServiceConnector: BodyStatsServiceConnector;
    private usersService: UsersService;


    constructor(echoConnector: NewsSeverityServiceConnector, limaConnector: WeatherAndCrowdedPlacesServiceConnector, whiskeyConnector: BodyStatsServiceConnector, usersService: UsersService) {
        this.newsServerityServiceConnector = echoConnector;
        this.weatherAndCrowdedPlacesServiceConnector = limaConnector;
        this.bodyStatsServiceConnector = whiskeyConnector;
        this.usersService = usersService;
    }

    calculateStats() {
        return this.usersService.getAllActiveLocationUsers().then((users: UserDB[] | null) => {
            if (!users || users.length == 0) {
                return;
            } else {
                users.forEach((user: UserDB) => {
                    if (user.lastLocation) {
                        let coords = {
                            lat: user.lastLocation.latitude,
                            long: user.lastLocation.longitude
                        };
                        this.newsServerityServiceConnector.updateUserLocation(user.email, coords);
                        if (user.medicalInformation) {
                            if (user.medicalInformation.stressFullPlaces) {
                                this.weatherAndCrowdedPlacesServiceConnector.getCrowdedPlaces(coords,
                                    user.medicalInformation.stressFullPlaces
                                );
                            }
                            if (user.medicalInformation.weatherTriggers) {
                                this.weatherAndCrowdedPlacesServiceConnector.getWeathersSeverity(coords, user.medicalInformation.weatherTriggers);
                            }
                        }
                    }
                });
            }
        });
    }
}