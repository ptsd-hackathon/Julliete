import {WhiskeyConnector} from "./connectors/WhiskeyConnector";
import {GQLUser} from "../../graphql-types";

export class UserInformationSender {
    private whiskeyConnector: WhiskeyConnector;

    constructor(whiskeyConnector: WhiskeyConnector) {
        this.whiskeyConnector = whiskeyConnector;
    }

    sendUserInformation(user: GQLUser) {
        this.whiskeyConnector.connect(user);
    }
}