import { action, computed, IReactionDisposer, observable, reaction, when } from "mobx";
import { History } from "history";
import { IFlow } from "interfaces/IFlow";
import { RoleStore } from "models/Role/RoleStore.ts";
import { UserStore } from "models/User/UserStore.ts";
import { Auth } from "models/Auth/Auth.ts";
import * as Constants from "models/Constants.ts";
import { IUser } from "interfaces/IUser";
import { IRole } from "interfaces/IRole";
import { Apps } from "models/App/AppsStore";
import { Settings } from "models/Settings";

export class AppStore implements IFlow {
  @observable role: IRole = new RoleStore();
  @observable user: IUser | null = null;
  @observable navigationHistory?: History;
  userDisposer?: IReactionDisposer;
  anonymousDisposer: IReactionDisposer;

  @computed get loggedIn(): boolean {
    return this.user !== null && !this.user.anonymous;
  }

  @computed get tokenIsReady(): boolean {
    return Auth.token !== null;
  }

  constructor() {
    when(() => this.user !== null, () => this.ifUserChanged());
    this.anonymousDisposer = reaction(() => {
      console.log('this.anonymousDisposer', this.user, this.loggedIn);
      return this.loggedIn;
    }, (loggedIn: boolean) => this.ifUserChanged());

  }

  @action
  async start() {
    await Auth.start();
    await Settings.fetch();
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
    this.userDisposer && this.userDisposer();
    this.anonymousDisposer();
    Apps.clear();
  }

  ifUserChanged() {
    console.log(2323232323, this.user);
    if (!this.navigationHistory || !this.user) {
      return;
    }
    if (this.user.anonymous) {
      this.navigationHistory.push(Constants.ROOT_ROUTE);
    } else {
      console.log(2323232323, this.navigationHistory.location.pathname, this.navigationHistory.location.pathname.includes(Constants.ADMIN_ROUTE));
      if (!this.navigationHistory.location.pathname.includes(Constants.ADMIN_ROUTE)) {
        this.navigationHistory.push(Constants.EVENTS_USERS_LIST_ROUTE);
      }
    }

  }

  setHistory(history: History) {
    this.navigationHistory = history;
  }

}

export const App = new AppStore();
