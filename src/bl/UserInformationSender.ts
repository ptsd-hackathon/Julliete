import {BodyStatsServiceConnector} from "./connectors/bodyStatsService.connector";
import {GQLUser} from "../../graphql-types";

export class UserInformationSender {
    private whiskeyConnector: BodyStatsServiceConnector;

    constructor(whiskeyConnector: BodyStatsServiceConnector) {
        this.whiskeyConnector = whiskeyConnector;
    }

    sendUserInformation(user: GQLUser) {
        this.whiskeyConnector.connect(user);
    }
}