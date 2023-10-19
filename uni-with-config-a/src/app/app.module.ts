import { APP_INITIALIZER, Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppConfigService } from './services/app-config.service';
import { RandomImageService } from './services/random-image.service';
import { HttpClientModule } from '@angular/common/http';

const configInitializerFactory = (configService: AppConfigService) => {
  console.debug('Entering AppModule app initializer');
  return () => {
    return configService.loadAppConfig();
  }
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    RandomImageService,
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: configInitializerFactory,
      multi: true,
      deps: [AppConfigService]
    }
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor() {
    console.debug("AppModule constructor");
  }
}

