import { Component, Inject } from '@angular/core';
import { AppConfig, APP_CONFIG } from './app.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  config: AppConfig = null!;

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig) {
    console.debug(`AppComponent constructor: ${appConfig.env}`);
    this.config = appConfig;
  }

  title = 'uni-with-config-b';
}
