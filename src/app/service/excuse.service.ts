import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from '@angular/router';
import { ExcuseEntity } from '../entity/excuse.entity';
import { ApiService } from './api.service';
import { ApiAction } from '../entity/api.entity';
import { random } from 'lodash-es';

@Injectable({
  providedIn: 'root'
})
export class ExcuseService {

  constructor(private api: ApiService) { }

  getJob(id: number): any {
    return this.api.fetch(ApiAction.EXCUSE, id);
  }

  getRandomId(): number {
    return random(1, 127);
  }
}


export const excuseResolver: ResolveFn<ExcuseEntity[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const id = Number(route.paramMap.get('id'));
  return inject(ExcuseService).getJob(id);
};
