import axios from "axios";
import {GQLUser} from "../../../graphql-types";

export class WhiskeyConnector {
    connect(user: GQLUser) {
        axios.post('http://129.213.109.100:3000/physical-measurements',
            {user: user})
            .then((res) => {
                console.log(res.data);
            }).catch(err=>console.log(err.response));
    }
}