import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { WeatherServiceProvider } from '../../providers/weather-service/weather-service';
import { Coordinate } from '../../models/CoordinatesModel';
import { WeatherModel } from '../../models/WeatherModel';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit {

  // Device geolocation
  coordinates: Coordinate;
  country: string;
  weatherData: WeatherModel

  constructor(
    public navCtrl: NavController, 
    private location: Geolocation, 
    private weather: WeatherServiceProvider ,
    private alertCtrl: AlertController
  ) {
    this.coordinates = new Coordinate();
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

    this.getPosition()
      .then(resp => {
          this.coordinates.long = resp.long;
          this.coordinates.lat  = resp.lat;

          this.weather.getWeatherToday(this.coordinates)
          .then( data => {
              
              this.country = data.country;
              this.weatherData = data.weatherData;
              
          });
      });

  }

  loadWeatherTomorrow() {
    this.getPosition()
    .then(resp => {
        this.coordinates.long = resp.long;
        this.coordinates.lat  = resp.lat;

        this.weather.getWeatherTomorrow(this.coordinates)
        .then( weatherData => this.weatherData = weatherData );
    });
  }

  /**
   * Get the device current position
   * and returns the longitude and latitude
   */
  getPosition() : Promise<Coordinate> {
    return new Promise((resolve, reject) => {
      this.location.getCurrentPosition()
        .then(resp => {
          
          let coordinates = new Coordinate();
          coordinates.long = resp.coords.longitude;
          coordinates.lat  = resp.coords.latitude;

          return resolve(coordinates);
        })
        .catch(err => {
          console.log('ERROR', err);
          
          const alert = this.alertCtrl.create({
            title: 'Error!',
            subTitle: err.message,
            buttons: ['OK']
          });

          alert.present();

          return reject(err);

        });
    })
  }

}
