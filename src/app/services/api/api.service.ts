import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import '@capacitor-community/http';
import { first } from 'rxjs/operators';
import { IReading } from 'src/app/models/i-reading';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private db: AngularFireDatabase) { }

  dbGet<T extends IReading>(path: string, start: Date, end: Date): Promise<T[]> {
    return this.db.list<T>(path,
      ref => ref.orderByChild('timestamp')
        .startAt(String(start.getTime()))
        .endAt(String(end.getTime()))
    )
      .valueChanges()
      .pipe(first())
      .toPromise();
  }
}
