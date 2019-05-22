import axios, {AxiosPromise} from "axios";

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

    private GetTokenUrl = `https://biobeatlogin.auth.eu-west-1.amazoncognito.com/oauth2/token?grant_type=client_credentials&scope=com.heroes/post`;
    private TokenAuth = "Basic N2xpM2tvOGhqYXV2MWk1bTByMjBnMGVhMDM6Y3EycHNmbGJlY3Y4ZXI4ajdsNG9yNGVucGJlNmxiNWRtYTkwZWhyOGdkaTJpcjIyMnNm";
    
    constructor() {}

    getMeasurement(patch_id: string, timestampstart:string, timestampend:string): AxiosPromise<BiobeatMeasurmentsResponse[]> {
        let getMeasurementsUrl = `https://nkxjoc59ab.execute-api.eu-west-1.amazonaws.com/test/heroes-get-measurement?patch_id=${patch_id}&timestampstart=${timestampstart}&timestampend=${timestampend}`;
        let biobeatToken: BiobeatTokenReponse;

        return this.getToken().then(res => {
            biobeatToken = res.data
            return axios.post(getMeasurementsUrl, { headers: {
                'bb_heroes': biobeatToken.access_token
            }});
        });
    }

    getToken(): AxiosPromise<BiobeatTokenReponse> {
        return axios.post(this.GetTokenUrl, { headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': this.TokenAuth
        }});
    }
}