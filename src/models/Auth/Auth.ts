
import { action, IReactionDisposer, observable, runInAction, when } from "mobx";
import { api, Apis, nonAuthorizedApi } from "api";
import { Errors } from "models/Errors";
import { IFlow } from "interfaces/IFlow";
import { App } from "models/App";
import { Dictionary, DictionaryService } from "services/Dictionary/Dictionary";
import validate from "validate.js";
import * as Constants from "models/Constants";
import { ILoginResult } from "interfaces/ILoginResult";
import { IAuthUser } from "interfaces/IAuthUser";

const constraints = {
  password: {
    presence: {
      message: `^${Dictionary.defValue(DictionaryService.keys.cantBeEmpty, Dictionary.defValue(DictionaryService.keys.password))}`
    },
    length: {
      minimum: 6,
      message: `^${Dictionary.defValue(DictionaryService.keys.cantBeLessThan, [Dictionary.defValue(DictionaryService.keys.password), '6'])}`
    }
  },
  email: {
    presence: {
      message: `^${Dictionary.defValue(DictionaryService.keys.cantBeEmpty, "Email")}`
    },
    email: {
      message: `^${Dictionary.defValue(DictionaryService.keys["auth:invalid-email"])}`
    }
  }
};

const registrConstraints = Object.assign({
  confirmPassword: {
    presence: {
      message: `^${Dictionary.defValue(DictionaryService.keys.cantBeEmpty, Dictionary.defValue(DictionaryService.keys.confirmPassword))}`
    },
    equality: {
      attribute: "password",
      message: `^${Dictionary.defValue(DictionaryService.keys.repeatPasswordNotEqual)}`
    }
  }
}, constraints);

export class AuthStore extends Errors implements IFlow {
  static REFRESH_TOKEN_KEY: string = "refreshToken";
  static ANONYMOUS: string = "anonymous";
  static REMEMBER_ME: string = "rememberMe";

  @observable token: string | null = null;
  @observable refreshToken: string | null = null;
  @observable rememberMe: boolean = false;
  @observable expires: number = 0;

  disposer?: IReactionDisposer;
  timer?: NodeJS.Timeout;

  get isExpired(): boolean {
    return Date.now() > this.expires;
  }

  @action async checkLocalStorage() {
    this.refreshToken = localStorage.getItem(AuthStore.REFRESH_TOKEN_KEY);
    const anonymous = localStorage.getItem(AuthStore.ANONYMOUS);
    if(anonymous) {
      await this.anonymous();
    } else {
      await this.refresh();
    }
  }

  @action
  async signup(email: string, password: string) {
    try {
      this.update(await api(Apis.Main).user.signup(email, password), true);
    } catch (err) {
      this.setError(Dictionary.value(err.message));
    }
  }

  @action
  async login(email: string, password: string) {
    try {
      const data = await nonAuthorizedApi(Apis.Main).user.login(email, password);
      this.update(data, true);
    } catch (err) {
      this.setError(Dictionary.value(err.message));
    }
  }

  @action
  async anonymous() {
    try {
      if(this.refreshToken) {
        runInAction(() => {
          this.token = `Bearer ${this.refreshToken}`;
        });
        const data = await api(Apis.Main).user.anonymous();
        this.update(data);
      } else {
        const data = await nonAuthorizedApi(Apis.Main).user.anonymous();
        this.update(data);
      }
    } catch (err) {
      this.setError(Dictionary.value(err.message));
    }
  }

  @action
  async refresh() {
    if (this.refreshToken === null) {
      return;
    }
    try {
      const data = await nonAuthorizedApi(Apis.Main).user.refresh(this.refreshToken);
      this.update(data, true);
    } catch (err) {
      console.log("Refresh Error", err.message);
      this.logout();
      App.navigationHistory && App.navigationHistory.push(Constants.LOGIN_ROUTE);
    }
  }

  @action
  update(response: ILoginResult, clearAnonymous: boolean = false) {
    this.token = response.token;
    this.expires = response.expires * 1000;
    localStorage.setItem(AuthStore.REFRESH_TOKEN_KEY, response.refreshToken);
    this.refreshToken = response.refreshToken;
    clearAnonymous && localStorage.removeItem(AuthStore.ANONYMOUS);
    App.setUser(response.user);
    this.checkExpiresTimer();
  }

  @action
  async logout() {
    try {
      await api(Apis.Main).user.logout();
      localStorage.setItem(AuthStore.ANONYMOUS, AuthStore.ANONYMOUS);
      App.user && App.user.setAnonymous(true);
    } catch (err) {
      console.log("Logout Error", err.message);
    }
  }

  @action
  async start() {
    await this.checkLocalStorage();
  }

  @action
  switchRememberMe() {
    this.rememberMe = !this.rememberMe;
    if(this.rememberMe) {
      localStorage.setItem(AuthStore.REMEMBER_ME, AuthStore.REMEMBER_ME);
    } else {
      localStorage.removeItem(AuthStore.REMEMBER_ME);
    }
  }

  clearStorage() {
    localStorage.removeItem(AuthStore.REFRESH_TOKEN_KEY);
    localStorage.removeItem(AuthStore.REMEMBER_ME);
    localStorage.removeItem(AuthStore.ANONYMOUS);
  }

  checkExpiresTimer() {
    if (this.timer) clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (this.isExpired) {
        this.refresh();
      } else {
        this.checkExpiresTimer();
      }
    }, 5000);
  }

  onInput(data: IAuthUser, login: boolean = false) {
    if (this.hasError) {
      this.setError(null);
    }
    return validate(data, login ? constraints : registrConstraints);
  }

  stop(): void {
    this.disposer && this.disposer();
    this.timer && clearTimeout(this.timer);
  }
}

export const Auth = new AuthStore();
