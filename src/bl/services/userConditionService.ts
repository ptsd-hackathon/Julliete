// import {NewsSeverityCondition, NewsSeverityServiceConnector} from "../connectors/newsServerityService.connector";
// import {
//     PlacesCondition,
//     WeatherAndCrowdedPlacesServiceConnector,
//     WeatherCondition
// } from "../connectors/weatherAndCrowdedPlacesServiceConnector";
// import {BodyStatsServiceConnector} from "../connectors/bodyStatsService.connector";
// import {UsersService} from "./usersService";
// import {UserDB} from "../../dal/types/user";
// import {Promise} from "mongoose";
//
// export interface UserCondition {
//     weatherCondition?: WeatherCondition,
//     placesCondition?: PlacesCondition,
//     newsCondition?: NewsSeverityCondition
// }
//
// export class UserConditionService {
//     private newsServerityServiceConnector: NewsSeverityServiceConnector;
//     private weatherAndCrowdedPlacesServiceConnector: WeatherAndCrowdedPlacesServiceConnector;
//     private bodyStatsServiceConnector: BodyStatsServiceConnector;
//     private usersService: UsersService;
//
//
//     constructor(echoConnector: NewsSeverityServiceConnector, limaConnector: WeatherAndCrowdedPlacesServiceConnector, whiskeyConnector: BodyStatsServiceConnector, usersService: UsersService) {
//         this.newsServerityServiceConnector = echoConnector;
//         this.weatherAndCrowdedPlacesServiceConnector = limaConnector;
//         this.bodyStatsServiceConnector = whiskeyConnector;
//         this.usersService = usersService;
//     }
//
//
//     calculateUsersCondition() {
//         return this.usersService.getAllActiveLocationUsers().then((users: UserDB[] | null) => {
//             if (!users || users.length == 0) {
//                 console.log("No active location users!");
//                 return;
//             } else {
//                 users.forEach((user: UserDB) => {
//                     if (user.lastLocation) {
//                         let coords = {
//                             lat: user.lastLocation.latitude,
//                             long: user.lastLocation.longitude
//                         };
//
//                         let promisesArr = this.extractPromisesArray(coords, user);
//
//                         const reflect = (p: any) => p.then((v: any) => ({val: v, success: true}),
//                             (e: any) => ({val: e, success: false}));
//
//                         Promise.all(promisesArr.map(reflect)).then((results: any) => {
//                             let userCondition: UserCondition = {};
//                             results[0].success ? userCondition.newsCondition = results[0].val.data : console.log("news condition could not be retrieved");
//                             results[1].success ? userCondition.placesCondition = results[1].val.data : console.log("places condition could not be retrieved");
//                             results[2].success ? userCondition.weatherCondition = results[2].val.data : console.log("weather condition could not be retrieved");
//                             return this.usersService.setUserCondition(user, userCondition).then(() => {
//                                 console.log("user " + user.email + " condition updated successfully")
//                             }).catch(err => {
//                                 throw new Error(err);
//                             });
//                         });
//                     }
//                 });
//             }
//         });
//     }
//
//     private extractPromisesArray(coords: { lat: number, long: number }, user: UserDB) {
//         let newsSeverityPromise = this.newsServerityServiceConnector.getNewsSeverityCondition(coords);
//         let placesSeverityPromise = user.medicalInformation && user.medicalInformation.stressFullPlaces ?
//             this.weatherAndCrowdedPlacesServiceConnector.getCrowdedPlaces(coords, user.medicalInformation.stressFullPlaces) : undefined;
//         let weatherSeverityPromise = user.medicalInformation && user.medicalInformation.weatherTriggers ?
//             this.weatherAndCrowdedPlacesServiceConnector.getWeathersSeverity(coords, user.medicalInformation.weatherTriggers) : undefined;
//         return [newsSeverityPromise, placesSeverityPromise, weatherSeverityPromise];
//     }
// }