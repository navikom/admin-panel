import { action, computed, observable } from "mobx";

// interfaces
import { IUsersEvents } from "interfaces/IUsersEvents";
import { GenderType, IUser } from "interfaces/IUser";
import { IUsersDevices } from "interfaces/IUsersDevices";

// services
import { Dictionary, DictionaryService } from "services/Dictionary/Dictionary";

// models
import { UserEventsStore } from "models/User/UserEventsStore";

import convertDate from "utils/convertDate";
import { IUsersApps } from "interfaces/IUsersApps";
import { UsersApps } from "models/User/UsersApps";
import { UsersDevices } from "models/User/UsersDevices";

export const MALE = "Male";
export const FEMALE = "Female";

/**
 * User model
 *
 */
export class UserStore implements IUser {
  userId!: number;
  createdAt!: Date;
  lastEvent!: Date;
  email!: string;
  referrer!: number;

  pk: string = "userId";

  @observable firstName!: string;
  @observable lastName!: string;
  @observable gender: GenderType = MALE;
  @observable birthday!: Date;
  @observable emailVerified: boolean = false;
  @observable notificationEmail!: boolean;
  @observable notificationSms: boolean = false;
  @observable phoneVerified: boolean = false;
  @observable subscription: boolean = false;
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

  @action setFullDataLoaded(value: boolean = true) {
    this.fullDataLoaded = value;
  }

  @action
  update(model: IUser) {
    model.eventsCount && (model.eventsCount = Number(model.eventsCount));
    convertDate(model);
    Object.assign(this, model);
    !this.events && (this.events = new UserEventsStore(this.userId));
    !this.gender && (this.gender = MALE);
    if(model.regions) {
      model.location = model.regions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];
    }
    model.devices && (this.devices = model.devices.map(device => UsersDevices.from(device)));
    model.apps && (this.apps = model.apps.map(app => UsersApps.from(app)));
  }

  @action updateForm(model: IUser) {
    Object.assign(this, model);
  }

  static from(model: IUser): UserStore {
    const user = new UserStore();
    user.update(model);
    return user;
  }

  static emptyUser(): UserStore {
    const user = new UserStore();
    user.update({
      userId: 0,
      email: "",
      firstName: "",
      lastName: "",
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: new Date(),
      lastLogin: 0,
      phone: undefined,
      birthday: new Date(),
      gender: MALE,
      emailVerified: false,
      phoneVerified: false,
      notificationEmail: false,
      notificationSms: false,
      subscription: false,
      referrer: undefined,
      eventsCount: 0,
      apps: undefined,
      roles: undefined,
      regions: undefined,
      location: undefined,
      lastEvent: undefined
    } as IUser);
    return user;
  }

}
