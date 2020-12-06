import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
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

  constructor(private db: AngularFireDatabase) { }

  dbGet<T extends IReading>(path: string, start: Date, end: Date): Promise<T[]> {
    return this.db.list<T>(path,
      ref => ref
        .orderByChild('timestamp')
        .startAt(start.getTime())
        .endAt(end.getTime()))
      .valueChanges()
      .pipe(first())
      .toPromise();
  }
}
