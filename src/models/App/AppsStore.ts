import { action, computed, observable } from "mobx";
// interfaces
import { IApp } from "interfaces/IApp";
import { IPagination } from "interfaces/IPagination";
// models
import { Pagination } from "models/Pagination";
import { AppStore } from "models/App/AppStore";
// services
import { Dictionary, DictionaryService } from "services/Dictionary/Dictionary";
import { api, Apis } from "api";

export class AppsStore extends Pagination<IApp> implements IPagination<IApp> {


  @computed get appTableData() {
    return this.tableData((e: IApp) =>
      [e.appId.toString(), e.title, Dictionary.timeDateString(e.createdAt), e.description || "—"]);
  }

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

  @action async loadFullData(app: IApp) {
    try {
      await app.update(await api(Apis.Main).app.fullData(app.appId));
    } catch (err) {
      this.setError(err.message);
    }
  }
}

export const Apps = new AppsStore();
