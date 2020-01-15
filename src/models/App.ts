import { action, computed, IReactionDisposer, observable, reaction, when } from "mobx";
import { History } from "history";

// interfaces
import { IFlow } from "interfaces/IFlow";
import { IUser } from "interfaces/IUser";
import { IRole } from "interfaces/IRole";

// models
import { RoleStore } from "models/Role/RoleStore.ts";
import { UserStore } from "models/User/UserStore.ts";
import { Auth } from "models/Auth/Auth.ts";
import * as Constants from "models/Constants.ts";
import { Apps } from "models/App/AppsStore";
import { Settings } from "models/Settings";
import { AppDataStore } from "models/App/AppDataStore";
import { Roles } from "models/Role/RolesStore";
import { Events } from "models/Event/EventsStore";
import { Regions } from "models/Region/RegionsStore";
import { SegmentRegionViewStore } from "views/Segments/store/SegmentRegionViewStore";

export class AppStore implements IFlow {
  @observable role: IRole = RoleStore.defaultRole();
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

  @computed get currentApp() {
    return AppDataStore.app;
  }

  @computed get appRoutes() {
    return AppDataStore.routes;
  }

  constructor() {
    when(() => this.user !== null, () => this.ifUserChanged());
    this.anonymousDisposer = reaction(() => {
      console.log('this.anonymousDisposer', this.user, this.loggedIn);
      return this.loggedIn;
    }, async (loggedIn: boolean) => {
      loggedIn && await Roles.fetch();
      this.ifUserChanged();
    });
    // when(() => Regions.allFetched, () => SegmentRegionViewStore.loadData());
  }

  @action
  async start() {
    await Auth.start();
    await Settings.fetch();
    Regions.addFakeRegions();
    when(() => this.tokenIsReady, async () => {
      await Regions.fetchItems();
    })

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

  clear() {
    Events.clear();
  }

  ifUserChanged() {
    console.log(2323232323, this.user);
    if (!this.navigationHistory || !this.user) {
      return;
    }
    if (this.user.anonymous) {
      this.clear();
      this.navigationHistory.push(Constants.ROOT_ROUTE);
    } else {
      console.log(757575575757, window.location.pathname, window.location.pathname.includes(Constants.PANEL_ROUTE));
      if (!window.location.pathname.includes(Constants.PANEL_ROUTE)) {
        this.navigationHistory.push(Constants.DASHBOARD_ROUTE);
      }
    }
  }

  setHistory(history: History) {
    this.navigationHistory = history;
  }

}

export const App = new AppStore();
