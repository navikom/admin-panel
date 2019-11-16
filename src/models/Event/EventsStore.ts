import { action, computed } from "mobx";
import { Pagination } from "models/Pagination";
import { IEvent } from "interfaces/IEvent";

import { EventStore } from "models/Event/EventStore";

class EventsStore extends Pagination<IEvent> {

  @computed get tableData() {
    return this.items.map(e =>
      [e.userId.toString(), e.createdAt, e.title, e.user.email, e.user.anonymousString, e.user.eventsCount.toString()]);
  }
  constructor() {
    super("eventId", "event", 20, "pagination", "?filter=user_group");
  }

  @action push(data: IEvent[]) {
    let l = data.length, i = 0;
    while (l--) {
      const item = data[i++];
      if(!this.has(item.eventId)) {
        this.items.push(EventStore.from(item));
      }
    }
  }
}

export const Events = new EventsStore();
