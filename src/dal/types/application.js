"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var AppSchema = new mongoose_1.Schema({
    appName: String
});
exports.App = mongoose_1.model("App", AppSchema);
//# sourceMappingURL=application.js.map