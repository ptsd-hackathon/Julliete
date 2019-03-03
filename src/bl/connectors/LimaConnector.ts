import axios from "axios";

export class LimaConnector {
    getCrowdedPlaces(coords: { lat: number, long: number }) {
        axios.get('http://129.213.103.20:3000/crowdedPlaces?lat=' + coords.lat + '&lng=' + coords.long).then((response :any) => {
            console.log("success call Lima - Crowded Places");
        }).catch((err) => console.log(err));
    }
}