import { Injectable } from '@angular/core';
import { TemperatureReading } from 'src/app/models/temperature-reading';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  private endpoint = '/DHT11/Temperature';

  constructor(
    private apiService: ApiService
  ) { }

  async getTemperature(start: Date, end: Date): Promise<TemperatureReading[]> {
    const response = (await this.apiService.dbGet(this.endpoint, start, end)).map(
      reading => {
        reading.timestamp = +reading.timestamp * 1000;
        return reading;
      });

    console.log('getTeperatureData - response: ', response);
    return response;
  }
}
