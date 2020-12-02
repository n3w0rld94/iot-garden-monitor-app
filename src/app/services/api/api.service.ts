import { Injectable } from '@angular/core';
import '@capacitor-community/http';
import { Plugins } from '@capacitor/core';
import { firebaseConfig } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = firebaseConfig.databaseURL;

  constructor() { }

  async get(endpoint: string, params: {}) {
    const { Http } = Plugins;
    const method = 'GET';
    const headers = this.getHeaders(method);

    const response = await Http.request({ method, url: this.baseUrl + endpoint, headers, params });
    console.log('get response: ', response);
    return response;
  }

  async post(endpoint: string, data: {}) {
    const { Http } = Plugins;
    const method = 'POST';
    const headers = this.getHeaders(method);

    const response = await Http.request({ method, url: this.baseUrl + endpoint, headers, data });
    console.log('get response: ', response);
    return response;
  }

  private getHeaders(method: string) {
    if (method === 'POST') {
      return { 'Content-Type': 'application/json' };
    }

    return {};
  }
}
