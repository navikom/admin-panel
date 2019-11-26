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
import validate from "validate.js";

const constraints = {
  description: {
    presence: {
      message: `^${Dictionary.defValue(DictionaryService.keys.cantBeEmpty, Dictionary.defValue(DictionaryService.keys.description))}`
    },
    length: {
      maximum: 700,
      message: `^${Dictionary.defValue(DictionaryService.keys.cantBeMoreThan, [Dictionary.defValue(DictionaryService.keys.description), '700'])}`
    }
  }
};

export class AppsStore extends Pagination<IApp> implements IPagination<IApp> {
  @observable appSaved: boolean = false;
  private timeOutId?: NodeJS.Timeout;

  @computed get appTableData() {
    return this.tableData((e: IApp) =>
      [e.appId.toString(), e.title, Dictionary.timeDateString(e.createdAt), e.description || "—"]);
  }

  constructor() {
    super("appId", "app", 20, "pagination", [5, 10, 25, 50]);
  }

  @action setAppSaved(value: boolean) {
    this.appSaved = value;
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

  @action
  onInput(data: {[key: string]: string}) {
    return validate(data, constraints);
  }

  @action
  saveApp(app: IApp, appData: IApp, files: any[]) {
    this.setAppSaved(true);
    this.timeOutId = setTimeout(() => this.setAppSaved(false), 5000);
  }

  @action clear() {
    this.timeOutId && clearTimeout(this.timeOutId);
  }
}

export const Apps = new AppsStore();
