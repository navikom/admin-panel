import { action, observable } from "mobx";
import { IRole } from "interfaces/IRole";
import { ADMIN_ROLE, PARTNER_ROLE, SUPER_ADMIN_ROLE, USER_ROLE } from "models/Constants";
import { IUser } from "interfaces/IUser";

export class RoleStore implements IRole {
  roleId!: number;
  createdAt!: Date;
  deletedAt!: Date;
  name!: typeof USER_ROLE | typeof ADMIN_ROLE | typeof PARTNER_ROLE | typeof SUPER_ADMIN_ROLE;
  updatedAt!: Date;
  users: IUser[] = new Array<IUser>();
}
