import {OnesignalConnector} from "./connectors/OnesignalConnector";

export class SeverityCalculator {
    calculateAndSendAlert(severityObject: { placesSeverity: { severity: number } }, userOneSignalId: string) {
        console.log(severityObject);
        let onesignalConnector = new OnesignalConnector();
        if (severityObject.placesSeverity.severity > 3) {
            onesignalConnector.send("OSHER HAMELECH!!!!!!!!!!!!!", userOneSignalId)
        }
    }
}