import { IUser } from "interfaces/IUser";
import { ADMIN_ROLE, PARTNER_ROLE, SUPER_ADMIN_ROLE, USER_ROLE } from "models/Constants";

export interface IRole {
  roleId: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
  name: typeof USER_ROLE | typeof ADMIN_ROLE | typeof PARTNER_ROLE | typeof SUPER_ADMIN_ROLE;
  users: IUser[];
}
