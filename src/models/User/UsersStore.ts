import { Pagination } from "models/Pagination";
import { action } from "mobx";
import { UserStore } from "models/User/UserStore";
import { IUser } from "interfaces/IUser";
import { api, Apis } from "api";

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

  @action async loadFullData(user: IUser) {
    if(user.fullDataLoaded) return;
    try {
      user.update(await api(Apis.Main).user.fullData(user.userId));
      user.setFullDataLoaded();
    } catch (err) {
      this.setError(err.message);
    }
  }

  @action getByIdFullData(id: number): IUser {
    let user: IUser;
    if(!this.has(id)) {
      user = UserStore.from({userId: id} as IUser);
      this.items.push(user);
    } else {
      user = this.getById(id) as IUser;
    }
    this.loadFullData(user);
    return user;
  }

  getOrCreate(data: IUser) {
    if(!this.has(data.userId)) {
      this.push([data]);
    }
    return this.getById(data.userId);
  }
}

export const Users = new UsersStore();
