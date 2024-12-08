import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any;

  constructor() {}

  loadConfig(): Promise<void> {
    return fetch('assets/config.json')
      .then((response) => response.json())
      .then((config) => {
        this.config = config;
      });
  }

  get apiUrl(): string {
    return this.config?.apiUrl || '';
  }
}
