import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { AppConfig, APP_CONFIG } from './app.config';
import { Subscription } from 'rxjs/internal/Subscription';
import { ClockService } from './services/clock.service';
import { RandomImageService } from './services/random-image.service';
import { NGXLogger, NgxLoggerLevel } from 'ngx-logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'uni-with-config-b';
  config: AppConfig = null!;
  clock: string;
  image: any;

  private timeSubscription: Subscription = new Subscription();
  private artSubscription: Subscription = new Subscription();

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig, private clockService: ClockService, private imageService: RandomImageService, private logger: NGXLogger) {
    console.debug(`AppComponent constructor: ${appConfig.env}`);
    this.config = appConfig;
    this.clock = "loading clock...";
    this.image = null!;

    console.debug(`NgxLogger browser level configured by runtime configuration: '${NgxLoggerLevel[this.logger.level]}'`);
    this.logger.trace(`Trace output`);
    this.logger.debug(`Debug output`);
    this.logger.info(`Info output`);
    this.logger.log(`Log output`);
    this.logger.warn(`Warn output`);
    this.logger.error(`Error output`);
    this.logger.fatal(`Fatal output`);
  }

  ngOnInit(): void {
    console.debug("AppComponent onInit")
    console.log(this.config);

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

  ngOnDestroy(): void {
    this.timeSubscription.unsubscribe();
    this.artSubscription.unsubscribe();
  }
}
