"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = __importDefault(require("axios"));
var BiobeatWatchService = /** @class */ (function () {
    function BiobeatWatchService() {
        this.getTokenUrl = "https://biobeatlogin.auth.eu-west-1.amazoncognito.com/oauth2/token?grant_type=client_credentials&scope=com.heroes/post";
        this.tokenAuth = "Basic N2xpM2tvOGhqYXV2MWk1bTByMjBnMGVhMDM6Y3EycHNmbGJlY3Y4ZXI4ajdsNG9yNGVucGJlNmxiNWRtYTkwZWhyOGdkaTJpcjIyMnNm";
    }
    BiobeatWatchService.prototype.getMeasurement = function (patch_id, timeStampStart, timeStampEnd) {
        var getMeasurementsUrl = "https://nkxjoc59ab.execute-api.eu-west-1.amazonaws.com/test/heroes-get-measurement?patch_id=" + patch_id + "&timestampstart=" + timeStampStart + "&timestampend=" + timeStampEnd;
        var biobeatToken;
        return this.getToken().then(function (res) {
            biobeatToken = res.data;
            return axios_1.default.post(getMeasurementsUrl, { headers: {
                    'bb_heroes': biobeatToken.access_token
                } });
        });
    };
    BiobeatWatchService.prototype.getToken = function () {
        return axios_1.default.post(this.getTokenUrl, { headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': this.tokenAuth
            } });
    };
    return BiobeatWatchService;
}());
exports.BiobeatWatchService = BiobeatWatchService;
//# sourceMappingURL=biobeatWatchService.js.map