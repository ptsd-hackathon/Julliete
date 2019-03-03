import {EchoConnector} from "./connectors/EchoConnector";
import {GQLLocationInput} from "../../graphql-types";

export class LocationSender{
    private echoConnector: EchoConnector;

    constructor(echoConnector: EchoConnector) {
        this.echoConnector = echoConnector;
    }

    sendLocation(email: string, coords: {lat: number, long: number}){
        this.echoConnector.connect(email, coords);
    }
}