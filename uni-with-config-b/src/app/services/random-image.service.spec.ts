import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { RandomImageService } from './random-image.service';
import { APP_CONFIG, AppConfig } from '../app.config';

describe('RandomImageService', () => {
  let service: RandomImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: APP_CONFIG,
          useFactory: (config: AppConfig) => {
            var config = new AppConfig();
            config.env = 'TEST';
            config.apiBaseUrl = 'http://base.url';
            config.activeTheme = "ThemeTest";
            config.buildRef = "T35t";
            config.loggerLevel = "DEBUG";
            return config;
          },
        }

      ],
    });
    service = TestBed.inject(RandomImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
