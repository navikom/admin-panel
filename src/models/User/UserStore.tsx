import { UserModel } from "api/ModelTypes.tsx";
import { action } from "mobx";

/**
 * User model
 *
 */
export class UserStore implements UserModel {
  userId?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  createdOn?: number;
  lastLogin?: number;

  anonymous: boolean = true;
  emailVerified: boolean = false;
  gender?: "male" | "female";
  notificationEmail?: boolean;
  notificationSms: boolean = false;
  phone?: number;
  phoneVerified: boolean = false;
  referrer?: number;
  subscription?: boolean;

  constructor(model: UserModel) {
    Object.assign(this, model);
  }

  @action
  setAnonymous(value: boolean) {
    this.anonymous = value;
  }

  @action
  update(model: UserModel) {
    Object.assign(this, model);
  }

  static from(model: UserModel): UserStore {
    return new UserStore(model);
  }
}
