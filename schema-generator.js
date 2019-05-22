"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_schema_typescript_1 = require("graphql-schema-typescript");
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var typeDefs = fs_1.default.readFileSync(path_1.default.join(__dirname, "src", "schema.graphqls"), "utf8");
graphql_schema_typescript_1.generateTypeScriptTypes(typeDefs, "graphql-types.d.ts")
    .then(function () {
    console.log('DONE');
    process.exit(0);
})
    .catch(function (err) {
    console.error(err);
    process.exit(1);
});
//# sourceMappingURL=schema-generator.js.map