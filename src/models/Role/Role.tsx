import { action, observable } from "mobx";

export enum Roles {
  Superadmin,
  Admin,
  User
}
export class RolesStore {
  @observable role = Roles.User;

  @action setRole(role: Roles):void {
    this.role = role;
  }
}
