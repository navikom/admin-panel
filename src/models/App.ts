import { action, computed, IReactionDisposer, observable, reaction, when } from "mobx";
import { History } from "history";
import { IFlow } from "interfaces/IFlow";
import { RoleStore } from "models/Role/RoleStore.ts";
import { UserStore } from "models/User/UserStore.ts";
import { Auth } from "models/Auth/Auth.ts";
import * as Constants from "models/Constants.ts";
import { IUser } from "interfaces/IUser";
import { Events } from "models/Event/EventsStore";
import { IRole } from "interfaces/IRole";

export class AppStore implements IFlow {
  @observable role: IRole = new RoleStore();
  @observable user?: IUser;
  @observable navigationHistory?: History;
  userDisposer: IReactionDisposer;
  anonymousDisposer: IReactionDisposer;

  @computed get loggedIn(): boolean {
    return this.user !== undefined && !this.user.anonymous;
  }

  @computed get tokenIsReady(): boolean {
    return Auth.token !== null;
  }

  constructor() {
    this.userDisposer = reaction(() => this.user,
      (user: IUser | undefined) => this.ifUserChanged());
    this.anonymousDisposer = reaction(() => this.loggedIn, (loggedIn: boolean) => this.ifUserChanged());

  }

  @action
  start(): void {
    Auth.start();
  }

  @action setUser(model: IUser) {
    if (!this.user) {
      this.user = UserStore.from(model);
    } else {
      this.user.update(model);
    }

  }

  stop(): void {
    Auth.stop();
    this.userDisposer();
    this.anonymousDisposer();
  }

  ifUserChanged() {
    if (!this.navigationHistory || !this.user) {
      return;
    }
    if (this.user.anonymous) {
      this.navigationHistory.push(Constants.ROOT_ROUTE);
    } else {
      if(!this.navigationHistory.location.pathname.includes(Constants.ADMIN_ROUTE)) {
        this.navigationHistory.push(Constants.EVENTS_USERS_LIST_ROUTE);
      }
    }

  }

  setHistory(history: History) {
    this.navigationHistory = history;
  }

}

export const App = new AppStore();
