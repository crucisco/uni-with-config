import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppConfigService } from './services/app-config.service';
import { AppConfig } from './app.config';
import { Subscription } from 'rxjs';
import { RandomImageService } from './services/random-image.service';

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

  constructor(private configService: AppConfigService, private imageService: RandomImageService) {
    console.debug("AppComponent constructor")
    this.config = new AppConfig();
    this.clock = new Date().toISOString();
    this.image = null!;
  }

  ngOnDestroy(): void {
    this.timeSubscription.unsubscribe();
  }

  ngOnInit(): void {
    console.debug("AppComponent onInit")
    this.config = this.configService.getConfig();
    console.log(this.config);

    this.timeSubscription = this.configService.getTimeObservable().subscribe(data => {
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
