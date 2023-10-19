import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs/internal/Subject';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root'
})
export class RandomImageService {
  // https://collectionapi.metmuseum.org/public/collection/v1/search?q=departmentId=11&hasImages=true&medium=Paintings
  private searchUrl: string = "/search?q=hasImages=true&medium=Paintings";
  private objectsUrl: string = "/objects";
  private euArtDepartmentId: number = 11;

  constructor(private http: HttpClient, private configService: AppConfigService) {
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
          credit: randomImageCredit});
      });
    });

    return randomImageUrlSubject;
  }

  private getRandomObjectId(): Observable<number> {
    let randomObjectIdSubject: Subject<number> = new Subject<number>();

    var randomId = this.getSearchResults()
    .subscribe(data => {
      let ids:number[] = data.objectIDs;
      let randomIndex = Math.floor(Math.random()*data.total);
      randomIndex = randomIndex == data.total ? randomIndex - 1 : randomIndex;

      randomObjectIdSubject.next(ids[randomIndex]);
    });

    return randomObjectIdSubject;
  }

  private getSearchResults(): Observable<any> {
    return this.http
      .get(this.configService.getConfig().apiBaseUrl + this.searchUrl + `&departmentId=${this.euArtDepartmentId}`);
  }

  private getObject(id: number): Observable<any> {
    return this.http
      .get(this.configService.getConfig().apiBaseUrl + this.objectsUrl + `/${id}`);
  }
}
