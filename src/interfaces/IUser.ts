import { WithPrimaryKey } from "interfaces/WithPrimaryKey";
import { IRole } from "interfaces/IRole";
import { IUsersApps } from "interfaces/IUsersApps";
import { IUsersRegions } from "interfaces/IUserRegion";
import { IUserDevice } from "interfaces/IUserDevice";
import { IUserEvents } from "interfaces/IUserEvents";

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
  gender?: 'male' | 'female';
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
  devices?: IUserDevice[];
  events: IUserEvents;
  regions?: IUsersRegions[];
  location?: IUsersRegions;
  lastEvent?: Date;

  fullDataLoaded: boolean;

  fullName?: string;
  anonymousString?: string;

  update(model: IUser): void;
  setAnonymous(value: boolean): void;
  setFullDataLoaded(): void;
  totalTime: string;
}
