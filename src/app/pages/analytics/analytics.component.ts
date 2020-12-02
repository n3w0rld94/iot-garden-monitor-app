import { Component, OnInit } from '@angular/core';
import { TemperatureReading } from 'src/app/models/temperature-reading';
import { TemperatureService } from 'src/app/services/temperature/temperature.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss'],
})
export class AnalyticsComponent implements OnInit {
  temperatureData: TemperatureReading[] = [] as TemperatureReading[];

  constructor(
    private temperatureService: TemperatureService
  ) { }


  ngOnInit() { }

  async getTemperatureData() {
    this.temperatureData = await this.temperatureService.getTeperatureData(Date.now() - 7 * 24 * 60 * 60 * 1000, Date.now());
  }
}
