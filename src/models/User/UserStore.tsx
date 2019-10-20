import { UserModel } from "api/ModelTypes.tsx";

/**
 * User model
 *
 */
export class UserStore {
  userId?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  createdOn?: number;
  lastLogin?: number;

  constructor(model: UserModel) {
    Object.assign(this, model);
  }

  static from(model: UserModel): UserStore {
    return new UserStore(model);
  }
}
