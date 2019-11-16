import { WithPrimaryKey } from "interfaces/WithPrimaryKey";
import { IUser } from "interfaces/IUser";

export interface IEvent extends WithPrimaryKey {
  eventId: number;
  userId: number;
  user: IUser;
  info: any;
  title: string;
  createdAt: string;
}
