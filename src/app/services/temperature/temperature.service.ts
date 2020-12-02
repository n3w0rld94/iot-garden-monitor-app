import { Injectable } from '@angular/core';
import { TemperatureReading } from 'src/app/models/temperature-reading';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  private endpoint = 'DHT11/Temperature.json';

  constructor(
    private apiService: ApiService
  ) { }

  async getTeperatureData(start: number, end: number, refresh?: boolean): Promise<TemperatureReading[]> {
    const response = await this.apiService.get(this.endpoint, { orderBy: 'timestamp', startAt: start, endAt: end });

    console.log('getTeperatureData - response: ', response);
    return [];
  }
}
