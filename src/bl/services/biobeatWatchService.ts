import axios, { AxiosPromise, AxiosResponse } from "axios";
import moment from 'moment';

export interface BiobeatTokenReponse {
    access_token: string;
    expires_in: number;
    token_type: string; 

}

export interface BiobeatMeasurmentsResponse {
    rr: number;
    pp: number;
    protocol_num: number;
    sbp: number;
    sv: number;
    spo2: number;
    movement: number;
    ci: number;
    timestamp: number;
    patch_id: string;
    hrv: number;
    hr: number;
    svr: number;
    co: number;
    dbp: number;
    temp: number;
    sweat: number;
    calories: number
}

export class BiobeatWatchService {

    private getTokenUrl = `https://biobeatlogin.auth.eu-west-1.amazoncognito.com/oauth2/token?grant_type=client_credentials&scope=com.heroes/post`;
    private token: BiobeatTokenReponse | null = null;
    private lastTokenUpdate: Date | null = null;
    private tokenAuth = "Basic N2xpM2tvOGhqYXV2MWk1bTByMjBnMGVhMDM6Y3EycHNmbGJlY3Y4ZXI4ajdsNG9yNGVucGJlNmxiNWRtYTkwZWhyOGdkaTJpcjIyMnNm";

    constructor() { }

    public async getMeasurement(patch_id: string, timeStampStart: string, timeStampEnd: string): Promise<AxiosResponse<BiobeatMeasurmentsResponse[]>> {
        let getMeasurementsUrl = `https://nkxjoc59ab.execute-api.eu-west-1.amazonaws.com/test/heroes-get-measurement?patch_id=${patch_id}&timestampstart=${timeStampStart}&timestampend=${timeStampEnd}`;

        try {
            if (!this.token || !this.isTokenValid()) {
                let tokenRes = await this.getToken();
                this.token = tokenRes.data;
                this.lastTokenUpdate = new Date();
                try {
                    return await this.getMeasurementFromWatch(getMeasurementsUrl, tokenRes.data, patch_id);
                }
                catch (e) {
                    console.log("error getting measurement " + e);
                    throw e;
                }
            }
            else {
                console.log("using existing token to get measurement of watch id " + patch_id);
                try {
                    return await this.getMeasurementFromWatch(getMeasurementsUrl, this.token, patch_id);
                }
                catch (e) {
                    console.log("error getting measurement " + e);
                    throw e;
                }
            }
        }
        catch (e) {
            console.log("error getting access token " + e);
            throw e;
        }
    }

    private isTokenValid() {
        let now = new Date();
        if (!this.lastTokenUpdate || !this.token) return false;
        var validUntilDate = moment(this.lastTokenUpdate).add(this.token.expires_in, 's').toDate();
        return (validUntilDate > now);
    }

    private async getMeasurementFromWatch(getMeasurementsUrl: string, tokenRes: BiobeatTokenReponse, patch_id: string) {
        let axiosPromise = await axios.get(getMeasurementsUrl, {
            headers: {
                'bb_heroes': tokenRes.access_token
            }
        });
        console.log("returning measurement data for watch " + patch_id);
        return Promise.resolve(axiosPromise);
    }

    private async getToken(): Promise<AxiosResponse<BiobeatTokenReponse>> {
        return axios.post(this.getTokenUrl, JSON.stringify({}), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': this.tokenAuth
            }
        });
    }
}