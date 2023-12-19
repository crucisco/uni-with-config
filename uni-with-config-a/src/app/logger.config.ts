import { NgxLoggerLevel } from "ngx-logger";

export class LoggerConfig {
  browserLogLevel: NgxLoggerLevel = NgxLoggerLevel.TRACE;
  serverLogLevel: NgxLoggerLevel = NgxLoggerLevel.TRACE;
  serverLoggingUrl: string | undefined;
}
