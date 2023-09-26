import { Injectable } from '@angular/core';
import { AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  private appConfig: AppConfig = new AppConfig();

  constructor() {
  }

  loadAppConfig() {
    var configFile = '../../assets/config.json'
    return fetch(configFile)
      .then((response) => {
        console.debug(`Fetched data from '${configFile}'`);
        return response.json();
      })
      .then((config) => {
        this.appConfig = config;
        console.debug(`App config env: ${this.appConfig.env}`);
      })
      .finally(() => {
        console.debug("All done");
      });
  }

  getConfig(): AppConfig {
    return this.appConfig;
  }
}
