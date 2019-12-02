import { action, computed, IReactionDisposer, observable, when } from "mobx";
import validate from "validate.js";
// interfaces
import { IApp } from "interfaces/IApp";
import { IAppsImages } from "interfaces/IAppsImages";
import { IAppTab } from "interfaces/IAppTab";
// models
import { Errors } from "models/Errors";
// services
import { Dictionary, DictionaryService } from "services/Dictionary/Dictionary";

import { api, Apis } from "api";
import AppTabs from "views/AppsList/components/AppTabs";


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

class AppDataLocalStore extends Errors {
  @observable appSaved: boolean = false;
  @observable fetching: boolean = false;
  @observable open: boolean = false;
  @observable app: IApp | null = null;
  @observable description?: string;
  @observable files: any;
  @observable errors!: {[k: string]: string};
  tabs!: IAppTab[];

  disposer?: IReactionDisposer;
  private timeOutId?: NodeJS.Timeout;

  @computed get isChanged() {
    return this.app !== null && this.app.description !== this.description || this.files !== undefined && this.files.length;
  };

  @computed get isDisabled() {
    return !this.isChanged || (this.errors !== undefined && Object.keys(this.errors).length);
  }

  @action bindApp(app: IApp | null) {
    if(app) {
      this.app = app;
      this.tabs = AppTabs[this.app.appId];
      this.disposer = when(() => app.description !== undefined, () => {
        this.description = app.description;
      });
    } else {
      this.clear();

    }
  }

  @action setAppSaved(value: boolean) {
    this.appSaved = value;
  }

  @action setFetching(value: boolean = true) {
    this.fetching = value;
  }

  @action
  onInput(data: {[key: string]: string}) {
    this.errors = validate(data, constraints);
    this.description = data.description;
  }

  @action
  async saveApp() {
    this.setFetching();
    try {
      const formData = new FormData();
      this.description && formData.append("description", this.description);
      (this.files || []).forEach((file: any, key: number) => formData.append("file", file));
      const data = await api(Apis.Main).app.update(this.app!.appId, formData);
      this.app!.update(data);
      this.setAppSaved(true);
      this.timeOutId = setTimeout(() => this.setAppSaved(false), 5000);
    } catch (e) {
      this.setError(e.message);
      this.timeOutId = setTimeout(() => this.setError(null), 10000);
    }
    this.setFetching(false);
  }

  @action setOpen(value: boolean) {
    this.open = value;
  }

  @action setFiles(files: any) {
    this.files = files;
    this.setOpen(false);
  }

  @action setDescription(value: string) {
    this.description = value;
  }

  @action async onSortItems(images: IAppsImages[]) {
    const data = images.map((e,i) => ({imageId: e.imageId, sort: i}));
    try {
      await api(Apis.Main).app.sortImages(this.app!.appId, data);
      images.forEach((e, i) => e.setSort(i));
    } catch (e) {
      console.log("Images sorting store error: %s", e.message);
    }
  }

  @action deleteAppImage(item: IAppsImages) {
    try {
      // api(Apis.Main).app.deleteAppImage(this.app!.appId, item.imageId);
      this.app!.images!.splice(this.app!.images!.indexOf(item), 1);
    } catch (e) {
      console.log("Delete App Image error: %s", e.message);
    }

  }

  @action clear() {
    console.log('AppDataStore clear');
    this.disposer && this.disposer();
    this.description = undefined;
    this.timeOutId && clearTimeout(this.timeOutId);
    this.files = undefined;
  }
}

export const AppDataStore = new AppDataLocalStore();
