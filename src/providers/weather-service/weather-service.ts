import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Coordinate } from '../../models/CoordinatesModel';
import { WeatherModel } from './../../models/WeatherModel';

/*
  Generated class for the WeatherServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WeatherServiceProvider {

  constructor(public http: HttpClient) {
    
  }

  /**
   *  Get Current Weather data and 
   *  return country and current weather
   */
  getWeatherToday(coordinates: Coordinate): Promise<any> {
    return new Promise ( (resolve, reject) => {
      this.http.get<any>(`https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.long}&units=metric&appid=e47f6ea4214e778128a3eac7ae501fcb`)
      .subscribe(data => {
        let country = '';
        let weatherData = new WeatherModel();

        country = data.sys.country;

        weatherData.maxTemp      = data.main.temp_max;
        weatherData.minTemp      = data.main.temp_min;
        weatherData.humidity     = data.main.humidity;
        weatherData.windDegree   = data.wind.deg;
        weatherData.windSpeed    = data.wind.speed;
        weatherData.weatherDesc  = data.weather[0].description;
        weatherData.seaLevel     = data.main.pressure;

        return resolve({
          country,
          weatherData
        });
        
      });
    });
         
  }

  getWeatherTomorrow(coordinates: Coordinate): Promise<WeatherModel> {
    return new Promise ( (resolve, reject) => {
      this.http.get<any>(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${coordinates.lat}&lon=${coordinates.long}&units=metric&appid=e47f6ea4214e778128a3eac7ae501fcb`)
      .subscribe(resp => {
        /** resp returns list of 7 day weather data. we need to take the 2nd item in the list */
        let data = resp.list[1];
        
        let weatherData = new WeatherModel();
        weatherData.maxTemp      = data.temp.max;
        weatherData.minTemp      = data.temp.min;
        weatherData.humidity     = data.humidity;
        weatherData.windDegree   = data.deg;
        weatherData.windSpeed    = data.speed;
        weatherData.weatherDesc  = data.weather[0].description;
        weatherData.seaLevel     = data.pressure;

        return resolve(weatherData);
        
      });
    });
  }

}
