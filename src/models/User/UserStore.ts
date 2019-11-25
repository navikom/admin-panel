import { action, computed, observable } from "mobx";

// interfaces
import { IUsersEvents } from "interfaces/IUsersEvents";
import { IUser } from "interfaces/IUser";
import { IUsersDevices } from "interfaces/IUsersDevices";

// services
import { Dictionary, DictionaryService } from "services/Dictionary/Dictionary";

// models
import { UserEventsStore } from "models/User/UserEventsStore";

import convertDate from "utils/convertDate";
import { IUsersApps } from "interfaces/IUsersApps";
import { UsersApps } from "models/User/UsersApps";
import { UsersDevices } from "models/User/UsersDevices";

/**
 * User model
 *
 */
export class UserStore implements IUser {
  userId!: number;
  createdAt!: Date;
  lastEvent!: Date;
  email!: string;
  firstName!: string;
  lastName!: string;

  emailVerified: boolean = false;
  notificationEmail!: boolean;
  notificationSms: boolean = false;
  phoneVerified: boolean = false;

  pk: string = "userId";

  @observable events?: IUsersEvents;
  @observable anonymous: boolean = true;
  @observable eventsCount: number = 1;
  @observable lastLogin!: number;
  @observable fullDataLoaded: boolean = false;
  @observable devices?: IUsersDevices[];
  @observable apps?: IUsersApps[];

  @computed
  get eventsItems() {
    return this.events || new UserEventsStore(this.userId);
  }

  @computed
  get fullName(): string {
    let name = (this.firstName ? this.firstName : "") + (this.lastName ? this.lastName : "");
    return name.length ? name : "No name";
  }

  @computed
  get anonymousString(): string {
    return this.anonymous ? Dictionary.defValue(DictionaryService.keys.anonymous)
      : Dictionary.defValue(DictionaryService.keys.loggedIn);
  }

  get totalTime() {
    const ms = Dictionary.moment(this.lastEvent).diff(Dictionary.moment(this.createdAt));
    const diff = Dictionary.moment.duration(ms);
    return [Math.round(diff.asHours()), diff.minutes(), diff.seconds()].join(':');
  }

  @action
  setAnonymous(value: boolean) {
    this.anonymous = value;
  }

  @action setFullDataLoaded() {
    this.fullDataLoaded = true;
  }

  @action
  update(model: IUser) {
    model.eventsCount && (model.eventsCount = Number(model.eventsCount));
    convertDate(model);
    Object.assign(this, model);
    !this.events && (this.events = new UserEventsStore(this.userId));
    if(model.regions) {
      model.location = model.regions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];
    }
    model.devices && (this.devices = model.devices.map(device => UsersDevices.from(device)));
    model.apps && (this.apps = model.apps.map(app => UsersApps.from(app)));
  }

  static from(model: IUser): UserStore {
    const user = new UserStore();
    user.update(model);
    return user;
  }

}
