import { IEvent } from "interfaces/IEvent";
import { IUser } from "interfaces/IUser";
import { Users } from "models/User/UsersStore";

export class EventStore implements IEvent {
  pk: string = "eventId";
  userId!: number;
  createdAt!: string;
  eventId!: number;
  info: any;
  title!: string;
  user!: IUser;

  constructor(model: IEvent) {
    Object.assign(this, model);
  }

  static from(model: IEvent) {
    model.user = Users.getOrCreate({...model.user, userId: model.userId}) as IUser;
    return new EventStore(model);
  }
}

