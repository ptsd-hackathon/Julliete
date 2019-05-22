const axios = require('axios');
export class LocationUtils{
    static async httpGet(theUrl: string) {
        let ans:any =  await axios.get(theUrl);
        return ans.data;
    }
}
