import { Injectable } from '@angular/core';
import { HumidityReading } from 'src/app/models/humidity-reading';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class HumidityService {
  private endpoint = '/DHT11/Humidity';

  constructor(private apiService: ApiService) { }

  async getHumidity(start: Date, end: Date): Promise<HumidityReading[]> {
    const response = (await this.apiService.dbGet(this.endpoint, start, end)).map(
      reading => {
        reading.timestamp = +reading.timestamp * 1000;
        return reading;
      });

    console.log('getTeperatureData - response: ', response);
    return response;
  }
}
