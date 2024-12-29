import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoaderService } from './loader.service';
import { isUndefined, omitBy } from 'lodash-es';
import { Observable, tap } from 'rxjs';
import { Params } from '@angular/router';
import { API, ApiAction, ApiEntity } from '../entity/api.entity';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient,
    private loaderService: LoaderService,
    private storage: StorageService
  ) { }


  fetch(
    action: ApiAction,
    id: number,
    params: Params = {}
  ): Observable<any> {
    return new Observable((subscriber: any) => {
      const path = [action, id];
      const urlParams = new URLSearchParams(omitBy(params, isUndefined));
      const cached = this.storage.getId(id, action);
      if (cached) {
        return subscriber.next(cached);
      }
      this.loaderService.show();
      this.httpClient
        .get(`${API.BASE_URL}/${path.join("/")}`, {
          // headers: { 'X-User-Token': this.userToken },
          params: new HttpParams({ fromString: urlParams.toString() }),
          observe: 'body',
        })
        .subscribe({
          next: (data: any) => {
            const item = data as ApiEntity;
            this.storage.addItem(action, data);
            subscriber.next(item);
          },
          error: (error: any) => console.debug(error),
        });
    });
  }
}
