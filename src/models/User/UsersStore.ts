import { Pagination } from "models/Pagination";
import { action } from "mobx";
import { UserStore } from "models/User/UserStore";
import { IUser } from "interfaces/IUser";

export class UsersStore extends Pagination<IUser> {
  constructor() {
    super("userId", "user", 20, "pagination")
  }

  @action push(data: IUser[]) {
    let l = data.length;
    while (l--) {
      if(!this.has(data[l].userId)) {
        this.items.push(UserStore.from(data[l]));
      }
    }
  }

  getOrCreate(data: IUser) {
    if(!this.has(data.userId)) {
      this.push([data]);
    }
    return this.getById(data.userId);
  }
}

export const Users = new UsersStore();
