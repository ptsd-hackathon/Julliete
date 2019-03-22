import {GraphQLScalarType, Kind} from "graphql";

export const dateScalarType = new GraphQLScalarType({
    name: "DateScalar",
    description: "Date scalar",
    serialize(value) {
        console.log(value + "a");

        return value.getTime();
    },
    parseValue(value) {
        console.log(value);
        console.log(new Date(value));
        return new Date(value);
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return parseInt(ast.value, 10); // ast value is always in string format
        }
        return null;
    }

});