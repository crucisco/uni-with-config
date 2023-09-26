import { Component, OnInit } from '@angular/core';
import { AppConfigService } from './services/app-config.service';
import { AppConfig } from './app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title: string = 'uni-with-config';
  config: AppConfig;

  constructor(private configService: AppConfigService) {
    console.debug("AppComponent constructor")
    this.config = new AppConfig();
  }

  ngOnInit(): void {
    console.debug("AppComponent onInit")
    this.config = this.configService.getConfig();
    console.log(this.config);
  }
}
