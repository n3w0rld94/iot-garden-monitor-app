import { Component, OnInit } from '@angular/core';
import { HumidityReading } from 'src/app/models/humidity-reading';
import { TemperatureReading } from 'src/app/models/temperature-reading';
import { HumidityService } from 'src/app/services/humidity/humidity.service';
import { TemperatureService } from 'src/app/services/temperature/temperature.service';
import * as moment from 'moment';

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
    this.temperature = await this.temperatureService.getTeperature(moment().startOf('year').toDate(), new Date(Date.now()));
    console.log('Temperature Data', this.temperature);
  }

  async getHumidity() {
    this.humidity = await this.humidityService.getHumidity(moment().startOf('year').toDate(), moment().toDate());
    console.log('Humidity Data', this.humidity);
  }

  prepareLabels() {

  }
}
