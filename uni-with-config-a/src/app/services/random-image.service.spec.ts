import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule} from '@angular/common/http/testing';
import { RandomImageService } from './random-image.service';

describe('RandomImageService', () => {
  let service: RandomImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(RandomImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
