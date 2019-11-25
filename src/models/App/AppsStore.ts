import { action } from "mobx";

// interfaces
import { IApp } from "interfaces/IApp";
import { IPagination } from "interfaces/IPagination";

// models
import { Pagination } from "models/Pagination";
import { AppStore } from "models/App/AppStore";

export class AppsStore extends Pagination<IApp> implements IPagination<IApp> {
  constructor() {
    super("appId", "app", 20, "pagination", [5, 10, 25, 50]);
  }

  @action push(data: IApp[]) {
    let l = data.length;
    while (l--) {
      if(!this.has(data[l].appId)) {
        this.items.push(AppStore.from(data[l]));
      }
    }
  }

  @action
  getOrCreate(data: IApp) {
    if(!this.has(data.appId)) {
      this.push([data]);
    }
    return this.getById(data.appId);
  }
}

export const Apps = new AppsStore();
