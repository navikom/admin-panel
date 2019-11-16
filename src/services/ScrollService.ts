import { IPagination } from "interfaces/IPagination";

export class ScrollHandler {
  store?: IPagination;

  setStore(store?: IPagination) {
    this.store = store;
  }

  listener(scrollTop: number, height: number) {
    this.store && this.store.reachedBottom(scrollTop, height);
  }
}

export const ScrollService = new ScrollHandler();
