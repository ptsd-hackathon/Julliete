import busyHours from 'busy-hours'

export class PlacesNearBy {
    static getNearByPlacesNames(result: any): Array<string> {
        let places: Array<string> = [];
        result.results.map(function (x: any) {
            x.types.map(function () {
                places.push(x.name);
            });
        });
        return places.filter(function (item: any, pos: any) {
            return places.indexOf(item) == pos;
        });
    }

    static async getSeverityOfLocation(result: any, apiKey: string): Promise<number> {
        let data = await PlacesNearBy.getBusyStatistics(result,apiKey).then(data=>PlacesNearBy.getAveregeCrowdedness(data));
        return await data;
    }
    private static async getBusyStatistics(result:any, apiKey:string): Promise<Array<number>>{
        let busyPlacesArray: Array<number> = [];
        let date = new Date();
        let day = date.getDay();
        let hours = date.getHours();
        await Promise.all( result.results.map(async (x:any) => {
            if (x.opening_hours) {
                if (x.opening_hours.open_now) {
                    let data = await busyHours(x.place_id, apiKey);
                    if (data) {
                        if (data.status == "ok") {
                            await busyPlacesArray.push(data.week[day].hours[hours - data.week[day].hours[0].hour].percentage);
                        }else await busyPlacesArray.push(20)
                    }
                }
            }
        }));
        return await busyPlacesArray;
    }
    private static getAveregeCrowdedness(busyPlacesArray: Array<number>): number {
        let sum = 0;
        for (let i = 0; i < busyPlacesArray.length; i++) {
            sum += busyPlacesArray[i]
        }
        return sum / busyPlacesArray.length;
    }
}

