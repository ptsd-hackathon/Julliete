"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var usersRepository_1 = require("../../dal/repositories/usersRepository");
var appsRepository_1 = require("../../dal/repositories/appsRepository");
function registerUser(root, _a) {
    var userEmail = _a.userEmail, appToken = _a.appToken, clockSerial = _a.clockSerial, userMetadata = _a.userMetadata;
    return __awaiter(this, void 0, void 0, function () {
        var appsRepository, appDBPromise, usersRepository, foundUserDB, userDB;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    appsRepository = new appsRepository_1.AppsRepository();
                    return [4 /*yield*/, appsRepository.findByToken(appToken)];
                case 1:
                    appDBPromise = _b.sent();
                    if (!appDBPromise) {
                        console.log("Cannot identify app token " + appToken);
                        throw new Error("Cannot identify app token");
                    }
                    usersRepository = new usersRepository_1.UsersRepository();
                    return [4 /*yield*/, usersRepository.findByEmailAndAppToken(userEmail, appToken)];
                case 2:
                    foundUserDB = _b.sent();
                    if (foundUserDB) {
                        console.log("User with email " + userEmail + " already exists for app token " + appToken);
                        throw new Error("User with email " + userEmail + " already exists");
                    }
                    userDB = {
                        email: userEmail,
                        appToken: appToken,
                        clockSerial: clockSerial,
                        metadata: {
                            fullName: userMetadata.fullName,
                            gender: userMetadata.gender,
                            dateOfBirth: userMetadata.dateOfBirth,
                            address: userMetadata.address,
                            medicalInformation: userMetadata.medicalInformation
                        }
                    };
                    return [4 /*yield*/, usersRepository.save(userDB)];
                case 3:
                    _b.sent();
                    console.log("successfully registered user with email " + userEmail);
                    return [2 /*return*/, true];
            }
        });
    });
}
exports.registerUser = registerUser;
//# sourceMappingURL=registerUser.resolver.js.map