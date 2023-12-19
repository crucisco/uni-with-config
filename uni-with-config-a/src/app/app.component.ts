import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppConfigService } from './services/app-config.service';
import { AppConfig } from './app.config';
import { LoggerConfig } from "./logger.config";
import { Subscription } from 'rxjs';
import { RandomImageService } from './services/random-image.service';
import { ClockService } from './services/clock.service';
import { NGXLogger, NgxLoggerLevel } from 'ngx-logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title: string = 'uni-with-config-a';
  config: AppConfig;
  clock: string;
  image: any;

  private timeSubscription: Subscription = new Subscription();
  private artSubscription: Subscription = new Subscription();

  constructor(private configService: AppConfigService, private clockService: ClockService, private imageService: RandomImageService, private logger: NGXLogger) {
    console.debug("AppComponent constructor")
    this.config = new AppConfig();
    this.clock = "loading clock...";
    this.image = null!;

    console.debug(`NgxLogger browser level as initialised: '${NgxLoggerLevel[this.logger.level]}'`);
  }

  ngOnDestroy(): void {
    this.timeSubscription.unsubscribe();
    this.artSubscription.unsubscribe();
  }

  ngOnInit(): void {
    console.debug("AppComponent onInit")
    this.config = this.configService.getConfig();
    console.log(this.config);

    this.initialiseLogger(this.config.logger!);

    this.timeSubscription = this.clockService.getTimeObservable().subscribe(data => {
      this.clock = data.toISOString();
    });

    this.artSubscription = this.imageService.getRandomImage().subscribe(data => {
      this.image = {
        url: data.url,
        title: data.title,
        credit: data.credit
      };
    });
  }

  private initialiseLogger(logConfig: LoggerConfig) {
    let configSnapshot = this.logger.getConfigSnapshot();
    configSnapshot.level = logConfig.browserLogLevel;
    configSnapshot.serverLogLevel = logConfig.serverLogLevel;
    configSnapshot.serverLoggingUrl = logConfig.serverLoggingUrl;

    this.logger.updateConfig(configSnapshot);

    console.debug(`NgxLogger browser level configured by runtime configuration: '${NgxLoggerLevel[this.logger.level]}'`);
    this.logger.trace(`Trace output`);
    this.logger.debug(`Debug output`);
    this.logger.info(`Info output`);
    this.logger.log(`Log output`);
    this.logger.warn(`Warn output`);
    this.logger.error(`Error output`);
    this.logger.fatal(`Fatal output`);
  }

}

