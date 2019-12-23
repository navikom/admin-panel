import { IUsersDevices } from "interfaces/IUsersDevices";
import { IUsersRegions } from "interfaces/IUsersRegions";
import { GenderType } from "interfaces/IUser";

export interface ISystemProps {
  userId: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  createdAt?: Date;
  deletedAt?: Date;
  lastLogin?: number;
  phone?: string;
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
  devices?: IUsersDevices[];
  location?: IUsersRegions;
  lastEvent?: Date;
}
