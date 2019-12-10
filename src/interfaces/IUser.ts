import { WithPrimaryKey } from "interfaces/WithPrimaryKey";
import { IRole } from "interfaces/IRole";
import { IUsersApps } from "interfaces/IUsersApps";
import { IUsersRegions } from "interfaces/IUsersRegions";
import { IUsersDevices } from "interfaces/IUsersDevices";
import { IUsersEvents } from "interfaces/IUsersEvents";

export type GenderType = 'Male' | 'Female';
export interface IUser extends WithPrimaryKey {
  readonly userId: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
  lastLogin?: number;
  phone?: number;
  birthday?: Date;
  gender?: GenderType;
  anonymous?: boolean;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  notificationEmail?: boolean;
  notificationSms?: boolean;
  subscription?: boolean;
  referrer?: number;
  eventsCount?: number;
  apps?: IUsersApps[];
  roles?: IRole[];
  devices?: IUsersDevices[];
  events?: IUsersEvents;
  regions?: IUsersRegions[];
  location?: IUsersRegions;
  lastEvent?: Date;

  fullDataLoaded: boolean;

  fullName?: string;
  anonymousString?: string;

  update(model: IUser): void;
  updateForm(model: IUser): void;
  setAnonymous(value: boolean): void;
  setFullDataLoaded(value?: boolean): void;
  totalTime: string;
  eventsItems: IUsersEvents;
}
