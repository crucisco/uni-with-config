import { InjectionToken } from "@angular/core";
import { NgxLoggerLevel } from "ngx-logger";

export class AppConfig {
  env: string = '';
  apiBaseUrl: string = ""
  activeTheme: string = '';
  logger: LoggerConfig | null = null;
  buildRef: string = '';
}

export class LoggerConfig {
  browserLogLevel: NgxLoggerLevel = NgxLoggerLevel.TRACE;
  serverLogLevel: NgxLoggerLevel = NgxLoggerLevel.TRACE;
  serverLoggingUrl: string | undefined;
}

export let APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG')
