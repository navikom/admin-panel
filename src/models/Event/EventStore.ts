import { IEvent } from "interfaces/IEvent";
import { IUser } from "interfaces/IUser";
import { Users } from "models/User/UsersStore";
import parseModel from "utils/parseModelRow";
import { EventInfoStore } from "models/Event/EventInfoStore";
import { IEventInfo } from "interfaces/IEventInfo";

export class EventStore implements IEvent {
  pk: string = "eventId";
  userId!: number;
  createdAt!: Date;
  eventId!: number;
  info!: IEventInfo;
  title!: string;
  user!: IUser;

  constructor(model: IEvent) {
    Object.assign(this, model);
  }

  static from(model: IEvent) {
    parseModel(model);
    model.user = Users.getOrCreate({...model.user, userId: model.userId}) as IUser;
    model.info = EventInfoStore.from(model.info);
    return new EventStore(model);
  }
}

