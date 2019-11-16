import { action, computed, observable } from "mobx";
import { IUser } from "interfaces/IUser";
import { Dictionary, DictionaryService } from "services/Dictionary/Dictionary";

/**
 * User model
 *
 */
export class UserStore implements IUser {
  birthday!: Date;
  userId!: number;
  email!: string;
  firstName!: string;
  lastName!: string;
  createdOn!: number;

  emailVerified: boolean = false;
  gender!: "male" | "female";
  notificationEmail!: boolean;
  notificationSms: boolean = false;
  phone!: number;
  phoneVerified: boolean = false;
  referrer!: number;
  subscription!: boolean;

  pk: string = "userId";

  @observable anonymous: boolean = true;
  @observable eventsCount: number = 1;
  @observable lastLogin!: number;

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

  constructor(model: IUser) {
    model.eventsCount && (model.eventsCount = Number(model.eventsCount));
    Object.assign(this, model);
  }

  @action
  setAnonymous(value: boolean) {
    this.anonymous = value;
  }

  @action
  update(model: IUser) {
    Object.assign(this, model);
  }

  static from(model: IUser): UserStore {
    return new UserStore(model);
  }

}
