import { ApiBase } from "api/ApiBase";
import { HttpBase } from "api/HttpBase";
import settings from "config/server";
import { ILoginResult } from "interfaces/ILoginResult";

export default class Api extends ApiBase {
  constructor(token?: string) {
    super(token);
  }

  get user(): User {
    return new User(this.token);
  }

  get event(): AEvent {
    return new AEvent(this.token);
  }

  get app(): App {
    return new App(this.token);
  }

  get setting(): Setting {
    return new Setting(this.token);
  }

  get pixartPicture(): PixartPicture {
    return new PixartPicture(this.token);
  }
}

class User extends HttpBase {
  constructor(token?: string) {
    super(`${settings.mainApi}/users`, token);
  }

  signup(email: string, password: string): Promise<ILoginResult> {
    const body = {
      email: email,
      password: password,
      grantType: "password"
    };
    return this.fetchData("post", "sign-up", body);
  }

  anonymous(): Promise<ILoginResult> {
    return this.fetchData("post", "anonymous");
  }

  login(email: string, password: string): Promise<ILoginResult> {
    const body = {
      email: email,
      password: password,
      grantType: "password"
    };
    return this.fetchData("post", "login", body);
  }

  logout(): Promise<null> {
    return this.fetchData("get", "logout");
  }

  refresh(refreshToken: string): Promise<ILoginResult> {
    const body = {
      token: refreshToken,
      grantType: "refresh_token"
    };
    return this.fetchData("post", "login", body)
  }
}

class AEvent extends HttpBase {
  constructor(token?: string) {
    super(`${settings.mainApi}/events`, token);
  }
}

class App extends HttpBase {
  constructor(token?: string) {
    super(`${settings.mainApi}/apps`, token);
  }

  add(title: string) {
    return this.fetchData("post", undefined, {title});
  }

  update(appId: number, data: any) {
    return this.fetchData("put", appId.toString(), data, undefined, ["Content-Type", "Accept"]);
  }

  sortImages(appId: number, data: {imageId: number, sort: number}[]) {
    return this.fetchData("put", `${appId}/images/sort`, data);
  }

  deleteAppImage(appId: number, imageId: number) {
    return this.fetchData("delete", `${appId}/image/${imageId}`);
  }
}

class Setting extends HttpBase {
  constructor(token?: string) {
    super(`${settings.mainApi}/settings`, token);
  }

  getData() {
    return this.fetchData("get");
  }
}

class PixartPicture extends HttpBase {
  constructor(token?: string) {
    super(`${settings.mainApi}/pixart-pictures`, token);
  }

  save(data: any) {
    return this.fetchData("post", undefined, data, undefined, ["Content-Type", "Accept"]);
  }
}
