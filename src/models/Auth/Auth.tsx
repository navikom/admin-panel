import React from "react";
import { action, observable, runInAction, when } from "mobx";
import { Apis, nonAuthorizedApi } from "api";
import { Errors } from "models/Errors";
import { LoginResultModel, UserModel } from "api/ModelTypes";
import { Flow } from "interfaces/Flow";
import { App } from "models/App";
import { Dictionary, DictionaryService } from "services";
import validate from "validate.js";

const constraints = {
  password: {
    presence: {
      message: `^${Dictionary.defValue(DictionaryService.keys.cantBeEmpty, "Password")}`
    },
    length: {
      minimum: 6,
      message: `^${Dictionary.defValue(DictionaryService.keys.cantBeLessThan, ["Password", 6])}`
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

export class AuthStore extends Errors implements Flow {
  @observable token: string | null = null;
  @observable refreshToken: string | null = null;
  static REFRESH_TOKEN_KEY: string = "refreshToken";

  @action checkLocalStorage() {
    this.refreshToken = localStorage.getItem(AuthStore.REFRESH_TOKEN_KEY);
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
    if (this.refreshToken == null) {
      return;
    }
    try {
      this.update(await nonAuthorizedApi(Apis.Pixelart).user().refresh(this.refreshToken));
    } catch (err) {
      this.setError(Dictionary.value(err.message));
    }
  }

  @action
  async update(response: LoginResultModel) {
    runInAction(() => {
      this.token = response.token;
      localStorage.setItem(AuthStore.REFRESH_TOKEN_KEY, response.refreshToken);
    });
    App.setUser(response.user);
  }

  @action logout() {
    this.token = null;
    App.setUser(null);
  }

  @action
  start(): void {
    when(() => this.refreshToken !== null, () => this.refresh());
    this.checkLocalStorage();
  }

  onInput(data: UserModel) {
    if(this.hasError) {
      this.setError(null);
    }
    return validate(data, constraints);
  }

  stop(): void {
  }
}

export const Auth = new AuthStore();
