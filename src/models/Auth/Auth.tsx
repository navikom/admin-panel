import React from "react";
import { action, computed, IReactionDisposer, observable, reaction, runInAction, when } from "mobx";
import { api, Apis, nonAuthorizedApi } from "api";
import { Errors } from "models/Errors";
import { LoginResultModel, UserModel } from "api/ModelTypes";
import { Flow } from "interfaces/Flow";
import { App } from "models/App";
import { Dictionary, DictionaryService } from "services";
import validate from "validate.js";
import * as Constants from "models/Constants";

const constraints = {
  password: {
    presence: {
      message: `^${Dictionary.defValue(DictionaryService.keys.cantBeEmpty, Dictionary.defValue(DictionaryService.keys.password))}`
    },
    length: {
      minimum: 6,
      message: `^${Dictionary.defValue(DictionaryService.keys.cantBeLessThan, [Dictionary.defValue(DictionaryService.keys.password), 6])}`
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

export class AuthStore extends Errors implements Flow {
  static REFRESH_TOKEN_KEY: string = "refreshToken";

  @observable token: string | null = null;
  @observable refreshToken: string | null = null;
  @observable shouldFirstRefresh: boolean = false;
  @observable rememberMe: boolean = false;
  @observable expires: number = 0;

  disposer?: IReactionDisposer;
  timer?: NodeJS.Timeout;

  get isExpired(): boolean {
    return Date.now() > this.expires;
  }

  @action checkLocalStorage() {
    this.refreshToken = localStorage.getItem(AuthStore.REFRESH_TOKEN_KEY);
    this.rememberMe = this.refreshToken !== null;
    this.rememberMe && (this.shouldFirstRefresh = true);
  }

  @action
  async signup(email: string, password: string) {
    try {
      this.update(await nonAuthorizedApi(Apis.Pixelart).user().signup(email, password));
    } catch (err) {
      this.setError(Dictionary.value(err.message));
    }
  }

  @action
  async login(email: string, password: string) {
    try {
      this.update(await nonAuthorizedApi(Apis.Pixelart).user().login(email, password));
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
      this.update(await nonAuthorizedApi(Apis.Pixelart).user().refresh(this.refreshToken));
    } catch (err) {
      console.log("Refresh Error", err.message);
      this.logout();
      App.navigationHistory && App.navigationHistory.push(Constants.LOGIN_ROUTE);
    }
  }

  @action
  update(response: LoginResultModel) {
    this.token = response.token;
    this.expires = response.expires * 1000;
    if (this.rememberMe) {
      localStorage.setItem(AuthStore.REFRESH_TOKEN_KEY, response.refreshToken);
      this.refreshToken = response.refreshToken;
    }
    App.setUser(response.user);
    this.checkExpiresTimer();
  }

  @action
  async logout() {
    try {
      await api(Apis.Pixelart).user().logout();
      this.token = null;
      localStorage.removeItem(AuthStore.REFRESH_TOKEN_KEY);
      App.setUser(null);
    } catch (err) {
      console.log("Logout Error", err.message);
    }

  }

  @action
  start(): void {
    when(() => this.shouldFirstRefresh, () => this.refresh());
    this.checkLocalStorage();
  }

  @action
  switchRememberMe() {
    this.rememberMe = !this.rememberMe;
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

  onInput(data: UserModel, login: boolean = false) {
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
