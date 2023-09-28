import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AppConfigService } from './services/app-config.service';
import { AppConfig } from './app.config';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'uni-with-config'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('uni-with-config');
  });

  it(`should get config data from service`, ()=> {
    const fakeConfig: AppConfig = new AppConfig();
    fakeConfig.activeTheme = "supertheme";
    fakeConfig.env = "UAT";
    fakeConfig.buildRef = "04ajsfdljsdk";
    fakeConfig.loggerLevel = "Warning";

    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const configService = fixture.debugElement.injector.get(AppConfigService);
    let spyGetConfig = spyOn(configService, "getConfig").and.returnValue(fakeConfig);

    var compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
    expect(compiled.querySelector("li.activeTheme")?.textContent).toEqual("ActiveTheme: supertheme");
  });
});
