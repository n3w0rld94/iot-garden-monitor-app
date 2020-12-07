import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';

const { Storage } = Plugins;
@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  async setObject(key: string, value: {}): Promise<boolean> {
    try {
      if (value) {
        await Storage.set({ key, value: JSON.stringify(value) });
        return true;
      }
    } catch (ex) {
      console.error('Storage: Error storing object key "' + key + '"', ex);
    }

    return false;
  }

  async getObject(key: string) {
    let parsedData = null;

    if (key) {
      try {
        const data = await Storage.get({ key });

        if (data.value) { parsedData = JSON.parse(data.value); }
      } catch (ex) {
        console.error('Storage: error retrieving object key "' + key + '"', ex);
      }
    }

    console.log('Storage: Retrieved object value ', parsedData);
    return parsedData;
  }

  async setItem(key: string, value: string): Promise<boolean> {
    await Storage.set({ key, value });

    return true;
  }

  async getItem(key: string): Promise<any> {
    try {
      const { value } = await Storage.get({ key });
      console.log('Storage: retrieved value ', value);

      return value;
    } catch (ex) {
      console.error('Storage: error retrieving key "' + key + '"', ex);
    }

    return null;
  }

  async removeItem(key: string): Promise<boolean> {
    if (key) {
      try {
        await Storage.remove({ key });
        return true;
      } catch (ex) {
        console.error('Storage: error deleting key "' + key + '"', ex);
      }
    }

    return false;
  }

  private async keys(): Promise<string[]> {
    const { keys } = await Storage.keys();
    console.log('Got keys: ', keys);

    return keys;
  }

  async clear(): Promise<boolean> {
    try {
      await Storage.clear();
      return true;
    } catch (ex) {
      console.error('Storage: error clearing storage. ', ex);
    }

    return false;
  }
}
