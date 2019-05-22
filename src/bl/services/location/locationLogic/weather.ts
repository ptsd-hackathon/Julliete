import {LocationUtils} from "./location-utils";

const apiKey = '19a439ed33e3f1ac4303c9fba5229ba6';

export class weather {
    static async handleWeather(lon: any, lat: any, language: string): Promise<{ description: string, temperature: string }> {
        let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}&lang=${language}`;
        let body: any = await LocationUtils.httpGet(url);
        if (body.main) {
            let temperature = body.main.temp;
            return {
                'description': body.weather[0].description,
                'temperature': temperature.toString()
            };
        }
        return {
            'description': '',
            'temperature': ''
        };
    }
}

