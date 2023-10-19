import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';
import { isBrowser } from 'browser-or-node';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private configFile: string = '../../assets/config.json';
  private appConfig: AppConfig = new AppConfig();

  constructor() {
  }

  loadAppConfig(): Promise<void> {
    if (isBrowser) {
      return this.loadConfigForBrowser();
    }
    else {
      return this.loadConfigForNode();
    }
  }

  getConfig(): AppConfig {
    return this.appConfig;
  }

  private loadConfigForBrowser(): Promise<void> {
    return fetch(this.configFile)
      .then((response) => {
        console.debug(`Browser fetch config data from '${this.configFile}'`);
        return response.json();
      })
      .then((config) => {
        this.appConfig = config;
        console.debug(`App config env: ${this.appConfig.env}`);
      });
  }

  private loadConfigForNode(): Promise<void> {
    let config = require('../../assets/config.json');
    console.debug(`Node server load data from '${this.configFile}'`);
    this.appConfig = config;
    console.debug(`App config env: ${this.appConfig.env}`);
    return Promise.resolve();
  }
}
