import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  /**
   * Get localStorage Key as JSON or as String
   *
   * @param key
   * @param asJSON
   */
  getKey(key: string, asJSON = true): any {
    return localStorage.getItem(key)
      ? asJSON
        ? JSON.parse(<string>localStorage.getItem(key))
        : localStorage.getItem(key)
      : null;
  }

  /**
   * Set localStorage Key as String
   *
   * @param key
   * @param data
   */
  setKey(key: string, data: string): void {
    key && data &&
    localStorage.setItem(key, data)
  }

  /**
   * Set localStorage value from json
   *
   * @param key
   * @param json
   */
  setKeyFromJSON(key: string, json: any): void {
    localStorage.setItem(key, JSON.stringify(json));
  }

  /**
   * Delete a key from localStorage
   *
   * @param key
   */
  destroyKey(key: string): void {
    localStorage.removeItem(key);
  }

  /**
   * Clear localStorage
   */
  clear(){
    localStorage.clear();
  }
}
