import {EchoConnector} from "./connectors/EchoConnector";
import {LimaConnector} from "./connectors/LimaConnector";
import {WhiskeyConnector} from "./connectors/WhiskeyConnector";

export class LocationSender {
    private echoConnector: EchoConnector;
    private limaConnector: LimaConnector;

    constructor(echoConnector: EchoConnector, limaConnector: LimaConnector) {
        this.echoConnector = echoConnector;
        this.limaConnector = limaConnector;
    }

    sendLocation(email: string, coords: { lat: number, long: number }) {
        this.echoConnector.connect(email, coords);
        this.limaConnector.getCrowdedPlaces(coords);
    }
}