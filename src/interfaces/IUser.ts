import { WithPrimaryKey } from "interfaces/WithPrimaryKey";

export interface IUser extends WithPrimaryKey {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  createdOn: number;
  lastLogin: number;
  phone: number;
  birthday: Date;
  gender: 'male' | 'female';
  anonymous: boolean;
  emailVerified: boolean;
  phoneVerified: boolean;
  notificationEmail: boolean;
  notificationSms: boolean;
  subscription: boolean;
  referrer: number;
  eventsCount: number;

  fullName: string;
  anonymousString: string;
}
