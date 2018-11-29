import { Component, Input } from '@angular/core';

/**
 * Generated class for the WeatherTableComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'weather-table',
  templateUrl: 'weather-table.html'
})
export class WeatherTableComponent {

  @Input() weatherData: Object;

  maxTemp: string;
  minTemp: string;
  windSpeed: string;
  humidity: string;
  seaLevel: string;
  weatherDesc: string;
  windDegree: string;

}
