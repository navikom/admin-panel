import { action, computed, IReactionDisposer, observable, reaction, when } from "mobx";
import { History } from "history";
import { IFlow } from "interfaces/IFlow";
import { RolesStore } from "models/Role/Role.ts";
import { UserStore } from "models/User/UserStore.ts";
import { Auth } from "models/Auth/Auth.ts";
import * as Constants from "models/Constants.ts";
import { IUser } from "interfaces/IUser";

export class AppStore implements IFlow {
  @observable roles: RolesStore = new RolesStore();
  @observable user?: UserStore;
  @observable navigationHistory?: History;
  userDisposer: IReactionDisposer;
  anonymousDisposer: IReactionDisposer;

  constructor() {
    this.userDisposer = reaction(() => this.user,
      (user: IUser | undefined) => this.ifUserChanged());
    this.anonymousDisposer = reaction(() => this.loggedIn, (loggedIn: boolean) => this.ifUserChanged());
    when(() => this.navigationHistory !== undefined,
      () => this.navigationHistory && this.navigationHistory.push(Constants.START_PAGE_ROUTE)
    );
  }

  @computed get loggedIn(): boolean {
    return this.user !== undefined && !this.user.anonymous;
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
      this.navigationHistory.push(Constants.EVENTS_USERS_LIST_ROUTE);
    }

  }

  setHistory(history: History) {
    this.navigationHistory = history;
  }

}

export const App = new AppStore();
