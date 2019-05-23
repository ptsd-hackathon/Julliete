import {UsersRepository} from "../../dal/repositories/usersRepository";
import {BiobeatMeasurmentsResponse, BiobeatWatchService} from "../services/biobeatWatchService";
import {MedicalStatsDB} from "../../dal/types/medicalStats";
import {EventsService} from "../services/events.service";
import {AxiosResponse} from "axios";
import moment from 'moment';

export class ClockIntegratorScheduler {
    private usersRepository: UsersRepository;
    private biobeatWatchService: BiobeatWatchService

    constructor() {
        this.usersRepository = new UsersRepository();
        this.biobeatWatchService = new BiobeatWatchService();
    }

    public async execute(): Promise<void> {
        let eventsService = new EventsService();
        let users = await this.usersRepository.findAll();
        if (users) {
            users.forEach(async user => {
                if (user.clockSerial) {
                    let endDate = new Date();
                    let startDate = new Date(Date.now() - 1800000);
                    let timeStampStart = moment(startDate).format('YYMMDDHHmmss').toString();
                    let timeStampEnd = moment(endDate).format('YYMMDDHHmmss').toString();
                    try {
                        let biobeatWatchMeasurementsResponse = await this.biobeatWatchService.getMeasurement(user.clockSerial, timeStampStart, timeStampEnd);
                        let biobeatWatchMeasurements = this.mapBiobeatMedicalStats(biobeatWatchMeasurementsResponse);
                        console.log("watch " + user.clockSerial + " measurements are: " + JSON.stringify(biobeatWatchMeasurements));
                        if (biobeatWatchMeasurements && biobeatWatchMeasurements != []) {
                            eventsService.addNewEvent(user.email, user.appToken, "REPEATABLE", "Biobeat Watch Medical Stats",
                                undefined, biobeatWatchMeasurements);
                        }
                    } catch (e) {
                        console.log("error while handling measurements of watch id " + user.clockSerial + " " + e);
                    }
                }
            });
        }
    }

    private mapBiobeatMedicalStats(biobeatWatchMeasurements: AxiosResponse<BiobeatMeasurmentsResponse[]>): MedicalStatsDB[] {
        //@ts-ignore
        let medicalStatsDB: MedicalStatsDB[] = biobeatWatchMeasurements.data.map(mes => ({
                breathRate: mes.rr,
                protocolNumber: mes.protocol_num,
                systolicBloodPressure: mes.sbp,
                strokeVolume: mes.sv,
                spo2: mes.spo2,
                movement: mes.movement,
                cardiacIndex: mes.ci,
                heartbeatRateVariance: mes.hrv,
                heartbeatRate: mes.hr,
                svr: mes.svr,
                cardiacOutput: mes.co,
                diastolicBloodPressure: mes.dbp,
                temperature: mes.temp,
                sweat: mes.sweat,
                MAPrs: mes.MAPrs,
                calories: mes.calories,
                timestamp: mes.timestamp
            }
        ));
        return medicalStatsDB;
    }
}