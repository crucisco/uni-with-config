import { NgModule, ValueProvider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RandomImageService } from './services/random-image.service';
import { ClockService } from './services/clock.service';
import { APP_CONFIG, AppConfig, LoggerConfig } from './app.config';
import { INGXLoggerConfig, LoggerModule, NGXLoggerConfigEngine, NgxLoggerLevel, TOKEN_LOGGER_CONFIG } from 'ngx-logger';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    LoggerModule.forRoot(null,
      {
        configProvider:
        {
          provide: TOKEN_LOGGER_CONFIG,
          useFactory: (config: AppConfig): INGXLoggerConfig => {
            if (config.logger) {
            return {
              level: config.logger.browserLogLevel,
              serverLogLevel: config.logger.serverLogLevel,
              serverLoggingUrl: config.logger.serverLoggingUrl
            }}
            else {
              return {
                level: NgxLoggerLevel.FATAL,
                serverLogLevel: NgxLoggerLevel.FATAL
              }
            }
          },
          deps: [APP_CONFIG]
        }
      })
  ],
  providers: [
    RandomImageService,
    ClockService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
