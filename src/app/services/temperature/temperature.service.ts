import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  private endpoint = 'DHT11/Temperature.json';

  constructor(
    private apiService: ApiService
  ) { }

  async getTeperatureData(start: Date, end: Date, refresh?: boolean) {
    const response = await this.apiService.get(this.endpoint, { orderBy: '', startAt: start, endAt: end })

    return [];
  }
}
