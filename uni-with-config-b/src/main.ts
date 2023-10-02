import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import { APP_CONFIG } from './app/app.config';

let configFile = "assets/config.json";
console.debug(`Executing main.ts - Loading config file from ${configFile}`);
fetch(configFile)
  .then((response) =>
  {
    return response.json();
  })
  .then((config) =>
  {
    console.debug(config);
    if (environment.production) {
      enableProdMode()
    }

    platformBrowserDynamic([{ provide: APP_CONFIG, useValue: config }])
      .bootstrapModule(AppModule)
      .catch((err) => console.error(err))
  })
