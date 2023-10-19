import { InjectionToken } from "@angular/core";

export class AppConfig {
  env: string = '';
  apiBaseUrl: string = ""
  activeTheme: string = '';
  loggerLevel: string = '';
  buildRef: string = '';
}

export let APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG')
