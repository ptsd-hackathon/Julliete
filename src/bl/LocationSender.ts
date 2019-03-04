import {EchoConnector} from "./connectors/EchoConnector";
import {LimaConnector} from "./connectors/LimaConnector";
import {WhiskeyConnector} from "./connectors/WhiskeyConnector";
import {GQLUser} from "../../graphql-types";

export class LocationSender {
    private echoConnector: EchoConnector;
    private limaConnector: LimaConnector;

    constructor(echoConnector: EchoConnector, limaConnector: LimaConnector) {
        this.echoConnector = echoConnector;
        this.limaConnector = limaConnector;
    }

    sendLocation(email: string, coords: { lat: number, long: number }, user: GQLUser) {
        this.echoConnector.connect(email, coords);
        let places = user.userInfo?user.userInfo.stressfullPlaces:[];
        this.limaConnector.getCrowdedPlaces(coords, places);
    }
}