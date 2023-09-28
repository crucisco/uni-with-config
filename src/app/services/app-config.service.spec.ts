import { TestBed } from '@angular/core/testing';

import { AppConfigService } from './app-config.service';
import { AppConfig } from '../app.config';

describe('AppConfigService', () => {
  let service: AppConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get config', async () => {
    await service.loadAppConfig();
    let config:AppConfig = service.getConfig();
    expect(config.env).toEqual("Dev");
    expect(config.activeTheme).toEqual("basic");
  });
});
