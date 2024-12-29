import { Injectable, inject } from '@angular/core';
import { LocalStorageService } from 'ngx-localstorage';
import { find, findIndex } from 'lodash-es';
import { ApiAction, ApiEntity } from '../entity/api.entity';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  protected readonly storage = inject(LocalStorageService);
  private readonly KEY_AUTOPLAY = "autoplay";

  getId(id: number, action: ApiAction): ApiEntity | null {
    const items = this.getItems(action);
    return find(items, { id: id }) || null;
  }

  addItem(action: ApiAction, value: ApiEntity) {
    const items = this.getItems(action)
    const idx = findIndex(items, { id: value.id });
    switch (idx) {
      case -1:
        items.push(value);
        break;
      default:
        items[idx] = value;
    }
    this.storage.set(action, items);
  }

  private getItems(action: ApiAction): ApiEntity[] {
    return this.storage.get(action) || [];
  }

  set autoplay(value: boolean) {
    this.storage.set(this.KEY_AUTOPLAY, value);
  }

  get autoplay(): boolean {
    const val: boolean | null =  this.storage.get(this.KEY_AUTOPLAY);
    return val === null ? true : val;
  }

}
