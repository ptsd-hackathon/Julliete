"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
exports.dateScalarType = new graphql_1.GraphQLScalarType({
    name: "DateScalar",
    description: "Date scalar",
    serialize: function (value) {
        console.log(value + "a");
        return value.getTime();
    },
    parseValue: function (value) {
        console.log(value);
        console.log(new Date(value));
        return new Date(value);
    },
    parseLiteral: function (ast) {
        if (ast.kind === graphql_1.Kind.INT) {
            return parseInt(ast.value, 10); // ast value is always in string format
        }
        return null;
    }
});
//# sourceMappingURL=date.scalar.js.map