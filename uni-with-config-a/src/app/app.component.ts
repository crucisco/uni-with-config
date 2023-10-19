import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppConfigService } from './services/app-config.service';
import { AppConfig } from './app.config';
import { Subscription } from 'rxjs';
import { RandomImageService } from './services/random-image.service';
import { ClockService } from './services/clock.service';

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

  constructor(private configService: AppConfigService, private clockService: ClockService, private imageService: RandomImageService) {
    console.debug("AppComponent constructor")
    this.config = new AppConfig();
    this.clock = "loading clock...";
    this.image = null!;
  }

  ngOnDestroy(): void {
    this.timeSubscription.unsubscribe();
    this.artSubscription.unsubscribe();
  }

  ngOnInit(): void {
    console.debug("AppComponent onInit")
    this.config = this.configService.getConfig();
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
}
