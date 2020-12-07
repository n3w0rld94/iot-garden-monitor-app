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
    const response = await this.apiService.dbGet(this.endpoint, start, end);

    console.log('getTeperatureData - response: ', response);
    return response;
  }
}
