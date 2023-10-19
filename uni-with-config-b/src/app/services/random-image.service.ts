import { HttpClient } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { APP_CONFIG, AppConfig } from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class RandomImageService {
  // https://collectionapi.metmuseum.org/public/collection/v1/search?q=departmentId=11&hasImages=true&medium=Paintings
  private searchUrl: string = "/search?q=";
  private imageFilter: string = "hasImages=true";
  private mediumFilter: string = "medium=Sculpture";
  private departmentFilter: string = "departmentId=11"; // European art
  private objectsUrl: string = "/objects";

  constructor(@Inject(APP_CONFIG) private appConfig: AppConfig, private http: HttpClient) {
  }

  public getRandomImage(): Observable<any> {
    let randomImageUrlSubject: Subject<any> = new Subject<any>();

    this.getRandomObjectId()
      .subscribe(randomId => {
        this.getObject(randomId)
          .subscribe(data => {
            let randomImageUrl = data.primaryImageSmall;
            let randomImageTitle = data.title;
            let randomImageCredit = data.artistDisplayName;
            randomImageUrlSubject.next({
              url: randomImageUrl,
              title: randomImageTitle,
              credit: randomImageCredit
            });
          });
      });

    return randomImageUrlSubject;
  }

  private getRandomObjectId(): Observable<number> {
    let randomObjectIdSubject: Subject<number> = new Subject<number>();

    var randomId = this.getSearchResults()
      .subscribe(data => {
        let ids: number[] = data.objectIDs;
        let randomIndex = Math.floor(Math.random() * data.total);
        randomIndex = randomIndex == data.total ? randomIndex - 1 : randomIndex;

        randomObjectIdSubject.next(ids[randomIndex]);
      });

    return randomObjectIdSubject;
  }

  private getSearchResults(): Observable<any> {
    let fullUrl = this.appConfig.apiBaseUrl + this.searchUrl + `${this.departmentFilter}&${this.imageFilter}&${this.mediumFilter}`;
    return this.http
      .get(fullUrl);
  }

  private getObject(id: number): Observable<any> {
    return this.http
      .get(this.appConfig.apiBaseUrl + this.objectsUrl + `/${id}`);
  }
}
