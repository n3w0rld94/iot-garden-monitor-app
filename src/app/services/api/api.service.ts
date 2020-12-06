import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import '@capacitor-community/http';
import { Plugins } from '@capacitor/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { IReading } from 'src/app/models/i-reading';
import { firebaseConfig } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = firebaseConfig.databaseURL;

  constructor(private db: AngularFireDatabase) { }

  dbGet<T extends IReading>(path: string, start: Date, end: Date): Promise<T[]> {
    return this.db.list<T>(path,
      ref => ref
        .orderByChild('timestamp')
        .startAt(start.toISOString())
        .endAt(end.toISOString()))
      .valueChanges().pipe(first()).toPromise();
  }

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
