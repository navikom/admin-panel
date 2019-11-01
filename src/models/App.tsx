import { action, computed, IReactionDisposer, observable, reaction } from "mobx";
import { History } from "history";
import { Flow } from "interfaces/Flow.js";
import { RolesStore } from "models/Role/Role";
import { UserStore } from "models/User/UserStore";
import { UserModel } from "api/ModelTypes";
import { Auth } from "models/Auth/Auth";
import * as Constants from "models/Constants";

export class AppStore implements Flow {
  @observable roles: RolesStore = new RolesStore();
  @observable user?: UserStore;
  navigationHistory?: History;
  userDisposer: IReactionDisposer;

  constructor() {
    this.userDisposer = reaction(() => this.user,
      (user: UserStore | undefined) => this.ifUserChanged());
  }

  @computed get loggedIn(): boolean {
    return this.user !== undefined && !this.user.anonymous;
  }

  @action
  start(): void {
    Auth.start();
  }

  @action setUser(model: UserModel) {
    if(!this.user) {
      this.user = UserStore.from(model);
    } else {
      this.user.update(model);
    }

  }

  stop(): void {
    Auth.stop();
    this.userDisposer();
  }

  ifUserChanged() {
    if(!this.navigationHistory || !this.user) {
      return;
    }
    if(this.user.anonymous) {
      this.navigationHistory.push(Constants.LOGIN_ROUTE);
    } else {
      this.navigationHistory.push(Constants.ADMIN_ROUTE);
    }

  }

  setHistory(history: History) {
    this.navigationHistory = history;
  }

}

export const App = new AppStore();
