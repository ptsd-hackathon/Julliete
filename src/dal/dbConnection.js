"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var DBConnection = /** @class */ (function () {
    function DBConnection() {
        this.uri = "mongodb://132.145.207.51/juliette";
    }
    DBConnection.prototype.connect = function () {
        mongoose_1.connect(this.uri, { useNewUrlParser: true }, function (err) {
            if (err) {
                console.log(err.message);
                console.log(err);
            }
            else {
                console.log('Connected to MongoDb');
            }
        });
    };
    return DBConnection;
}());
exports.DBConnection = DBConnection;
//# sourceMappingURL=dbConnection.js.map