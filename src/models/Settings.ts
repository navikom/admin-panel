import { IBeefree, ISettings } from "interfaces/ISettings";
import { action, observable } from "mobx";
import { api, Apis } from "api";
import { Events } from "models/Event/EventsStore";
import { Segments } from "models/Segment/SegmentsStore";

class Beefree {
  token: string;
  expires: Date;
  constructor(token: string, expires: Date) {
    this.token = token;
    this.expires = expires;
  }

  static from(model: IBeefree) {
    return new Beefree(model.token, model.expires);
  }
}

class SettingsStore implements ISettings {
  @observable loaded: boolean = false;
  cloudinaryPath?: string;
  cloudinaryFolder?: string;
  beefreeError: string | null = null;
  beefree?: IBeefree;

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
    this.beefreeError = data.beefreeError;
    data.beefree && (this.beefree = Beefree.from(data.beefree));
    Events.setSystemEventsList(data.systemEventsList as []);
    Segments.setExpressions(data.expressions as []);
    this.loaded = true;
  }
}

export const Settings = new SettingsStore();
