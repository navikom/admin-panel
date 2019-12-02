import { ISettings } from "interfaces/ISettings";
import { action, observable } from "mobx";
import { api, Apis } from "api";

class SettingsStore implements ISettings {
  @observable loaded: boolean = false;
  cloudinaryPath?: string;
  cloudinaryFolder?: string;

  @action async fetch() {
    try {
      const data = await api(Apis.Main).setting.getData();
      this.update(data);
    } catch (e) {
      console.log('Settings error: %s', e.message);
    }
  }

  @action update(data: ISettings) {
    this.cloudinaryPath = data.cloudinaryPath;
    this.cloudinaryFolder = data.cloudinaryFolder;
    this.loaded = true;
  }
}

export const Settings = new SettingsStore();
