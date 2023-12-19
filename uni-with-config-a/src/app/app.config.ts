import { InjectionToken } from "@angular/core"
import { LoggerConfig } from "./logger.config";

export class AppConfig {
  env: string = ""
  apiBaseUrl: string = ""
  activeTheme: string = ""
  logger: LoggerConfig | null = null;
  buildRef: string = ""
}

export let APP_CONFIG = new InjectionToken<AppConfig>('APP_CONFIG')
