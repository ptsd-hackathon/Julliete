import {UsersRepository} from "../../dal/repositories/usersRepository";
import { BiobeatWatchService, BiobeatMeasurmentsResponse } from "../services/biobeatWatchService";
import { MedicalStatsDB } from "../../dal/types/medicalStats";
import { EventsService } from "../services/events.service";
const moment = require('moment'); 

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
           await users.forEach(user => {
                if (user.clockSerial) {
                    let biobeatWatchMeasurements: BiobeatMeasurmentsResponse[];
                    let endDate = new Date();
                    let startDate = new Date(Date.now()-1800000);
                    let timeStampStart = moment(startDate).format('YYMMDDHHmmss').toString();
                    let timeStampEnd = moment(endDate).format('YYMMDDHHmmss').toString();
                    this.biobeatWatchService.getMeasurement(user.clockSerial, timeStampStart, timeStampEnd).then(biobeatWatchMeasurementsResponse => {
                        biobeatWatchMeasurements = biobeatWatchMeasurementsResponse.data;
                        let mappedBiobeatWatchMeasurments = this.mapBiobeatMedicalStats(biobeatWatchMeasurements)
                        eventsService.addNewEvent(user.email, user.appToken, "REPEATABLE", "Biobeat Watch Medical Stats",
                        undefined, mappedBiobeatWatchMeasurments);
                    });
                }
            });
        }
    }

    private mapBiobeatMedicalStats(biobeatWatchMeasurements: BiobeatMeasurmentsResponse[]): MedicalStatsDB[]{
        //@ts-ignore
        let medicalStatsDB: MedicalStatsDB[] = biobeatWatchMeasurements.map(mes => ({
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
            calories: mes.calories,
            timestamp: mes.timestamp
            }
        ));
        return medicalStatsDB;
    }
}