import { Component, OnInit } from '@angular/core';
import { HumidityReading } from 'src/app/models/humidity-reading';
import { TemperatureReading } from 'src/app/models/temperature-reading';
import { HumidityService } from 'src/app/services/humidity/humidity.service';
import { TemperatureService } from 'src/app/services/temperature/temperature.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent implements OnInit {
  temperature: TemperatureReading[] = [] as TemperatureReading[];
  humidity: HumidityReading[] = [] as HumidityReading[];
  startDate: Date;
  endDate: Date;
  weekMilliseconds = 7 * 24 * 60 * 60 * 1000;

  constructor(
    private temperatureService: TemperatureService,
    private humidityService: HumidityService
  ) { }


  ngOnInit() {
    this.getTemperature();
    this.getHumidity();
  }

  async getTemperature() {
    this.temperature = await this.temperatureService.getTeperature(new Date(Date.now() - this.weekMilliseconds), new Date(Date.now()));
    console.log('Temperature Data', this.temperature);
  }

  async getHumidity() {
    this.humidity = await this.humidityService.getHumidity(new Date(Date.now() - this.weekMilliseconds), new Date(Date.now()));
    console.log('Humidity Data', this.humidity);
  }
}
