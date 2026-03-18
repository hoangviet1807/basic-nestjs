import { Injectable } from '@nestjs/common';

@Injectable()
export class WeatherTool {
  async getWeather(lat: number, lon: number) {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${13.7684}&longitude=${109.225}&current_weather=true`;

    const res = await fetch(url);
    const data = await res.json();

    return data.current_weather;
  }
}
