import React from "react";
import { action, IReactionDisposer, observable, when } from "mobx";
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
    if(this.refreshToken === null) {
      this.anonymous();
    } else {
      this.rememberMe = true;
      this.shouldFirstRefresh = true
    }
  }

  @action
  async signup(email: string, password: string) {
    try {
      this.update(await api(Apis.Main).user.signup(email, password));
    } catch (err) {
      this.setError(Dictionary.value(err.message));
    }
  }

  @action
  async login(email: string, password: string) {
    try {
      this.update(await nonAuthorizedApi(Apis.Main).user.login(email, password));
    } catch (err) {
      this.setError(Dictionary.value(err.message));
    }
  }

  @action
  async anonymous() {
    try {
      this.update(await nonAuthorizedApi(Apis.Main).user.anonymous());
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
      this.update(await nonAuthorizedApi(Apis.Main).user.refresh(this.refreshToken));
    } catch (err) {
      console.log("Refresh Error", err.message);
      this.logout();
      App.navigationHistory && App.navigationHistory.push(Constants.LOGIN_ROUTE);
    }
  }

  @action
  update(response: ILoginResult) {
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
      await api(Apis.Main).user.logout();
      localStorage.removeItem(AuthStore.REFRESH_TOKEN_KEY);
      App.user && App.user.setAnonymous(true);
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

  clearStorage() {
    localStorage.removeItem(AuthStore.REFRESH_TOKEN_KEY);
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
