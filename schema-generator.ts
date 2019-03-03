import { generateTypeScriptTypes } from 'graphql-schema-typescript';
import fs from "fs";
import path from "path";

const typeDefs = fs.readFileSync(path.join(__dirname, "src", "schema.graphqls"), "utf8");

generateTypeScriptTypes(typeDefs, "graphql-types.d.ts")
    .then(() => {
        console.log('DONE');
        process.exit(0);
    })
    .catch(err =>{
        console.error(err);
        process.exit(1);
    });
