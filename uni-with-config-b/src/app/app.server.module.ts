import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';

import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { APP_CONFIG, AppConfig } from './app.config';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
  ],
  providers: [
    {
      provide: APP_CONFIG,
      useFactory: (config: AppConfig) => {
        config = require("../assets/config.json");
        console.debug(`Node server loaded app config for prerendering. Env: ${config.env}`);
        return config;
      }
    }
  ],
  bootstrap: [AppComponent],
})
export class AppServerModule {}
