import { WithPrimaryKey } from "interfaces/WithPrimaryKey";
import { IUser } from "interfaces/IUser";
import { IEventInfo } from "interfaces/IEventInfo";

export interface IEvent extends WithPrimaryKey {
  eventId: number;
  userId: number;
  user: IUser;
  info: IEventInfo;
  title: string;
  createdAt: Date;
}
