import { Component, OnInit } from "@angular/core";
import { NavController, AlertController } from "ionic-angular";
import { Geolocation } from "@ionic-native/geolocation";
import { WeatherServiceProvider } from "../../providers/weather-service/weather-service";
import { Coordinate } from "../../models/CoordinatesModel";
import { WeatherModel } from "../../models/WeatherModel";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage implements OnInit {
  // Device geolocation
  coordinates: Coordinate;
  displayCoordinates: Coordinate;
  country: string;
  weatherData: WeatherModel;
  hourlyForecast: Number;

  constructor(
    public navCtrl: NavController,
    private location: Geolocation,
    private weather: WeatherServiceProvider,
    private alertCtrl: AlertController
  ) {
    this.coordinates = new Coordinate();
    this.displayCoordinates = new Coordinate();
    this.weatherData = new WeatherModel();
  }

  ngOnInit() {
    // Load today's weather as default
    // when the app starts
    this.loadWeather();
  }

  /**
   * Retrive Current Weather
   */
  loadWeather(): void {
    this.getPosition().then(resp => {
      this.coordinates.long = resp.long;
      this.coordinates.lat = resp.lat;

      this.displayCoordinates.long = parseFloat(resp.long.toFixed(4));
      this.displayCoordinates.lat = parseFloat(resp.lat.toFixed(4));

      this.weather.getWeatherToday(this.coordinates).then(data => {
        this.country = data.country;
        this.weatherData = data.weatherData;
      });
    });
  }

  loadWeatherTomorrow() {
    this.getPosition().then(resp => {
      this.coordinates.long = resp.long;
      this.coordinates.lat = resp.lat;

      this.displayCoordinates.long = parseFloat(resp.long.toFixed(4));
      this.displayCoordinates.lat = parseFloat(resp.lat.toFixed(4));

      this.weather
        .getWeatherTomorrow(this.coordinates)
        .then(weatherData => (this.weatherData = weatherData));
    });
  }

  /**
   * Get the device current position
   * and returns the longitude and latitude
   */
  getPosition(): Promise<Coordinate> {
    return new Promise((resolve, reject) => {
      this.location
        .getCurrentPosition()
        .then(resp => {
          let coordinates = new Coordinate();
          coordinates.long = resp.coords.longitude;
          coordinates.lat = resp.coords.latitude;

          return resolve(coordinates);
        })
        .catch(err => {
          console.log("ERROR", err);

          const alert = this.alertCtrl.create({
            title: "Error!",
            subTitle: err.message,
            buttons: ["OK"]
          });

          alert.present();

          return reject(err);
        });
    });
  }

  /**
   * retrieve hourly forecast for the day
   *
   * 
   */
  hourlyRange() {
    /**
     * if the range is 0 we default back to
     *  the current weather for the day
     */
    if (this.hourlyForecast === 0) {
      this.loadWeather();
    } else {
      /** hourlyforacast is casted to a string and passed */
      this.weather
        .getHourlyForecast(this.coordinates, `${this.hourlyForecast}`)
        .then(weatherData => (this.weatherData = weatherData));
    }
  }

   debounce(fun, mil) {
    var timer; 
    return function(){
        clearTimeout(timer); 
        timer = setTimeout(function(){
            fun(); 
        }, mil); 
    };
}
}
