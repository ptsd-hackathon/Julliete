"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var UserSchema = new mongoose_1.Schema({
    email: String,
    appToken: String,
    clockSerial: String,
    metadata: {
        fullName: String,
        gender: String,
        dateOfBirth: Date,
        address: {
            state: String,
            city: String,
            street: String,
            apartment: String
        },
        medicalInformation: mongoose_1.Schema.Types.Mixed
    }
});
exports.User = mongoose_1.model("User", UserSchema);
//# sourceMappingURL=user.js.map