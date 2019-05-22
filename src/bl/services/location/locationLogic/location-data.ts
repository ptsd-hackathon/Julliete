interface LocationData {
    address:string
    crowdedness: number
    pointsOfInterest: Array<string>
    weather: {description:string, temperature: string}
}