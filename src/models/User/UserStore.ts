import { action, computed, observable } from "mobx";
import { IUser } from "interfaces/IUser";
import { Dictionary, DictionaryService } from "services/Dictionary/Dictionary";
import { IRegion } from "interfaces/IRegion";
import convertDate from "utils/convertDate";

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

  @observable anonymous: boolean = true;
  @observable eventsCount: number = 1;
  @observable lastLogin!: number;
  @observable fullDataLoaded: boolean = false;

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

  constructor(model: IUser) {
    model.eventsCount && (model.eventsCount = Number(model.eventsCount));
    Object.assign(this, model);
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
    if(model.regions) {
      model.location = model.regions.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];
    }
    convertDate(model);
    // console.log(12121122, model);
    Object.assign(this, model);
  }

  static from(model: IUser): UserStore {
    return new UserStore(model);
  }

}
