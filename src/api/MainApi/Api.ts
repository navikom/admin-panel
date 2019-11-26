import { ApiBase } from "api/ApiBase";
import { HttpBase } from "api/HttpBase";
import settings from 'config/server';
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
}

class User extends HttpBase {
  constructor(token?: string) {
    super(`${settings.mainApi}/users`, token);
  }

  pagination(page: number, pageSize: number, additionalParams?: number) {
    return this.fetchData('get', `${page}/${pageSize}${additionalParams ? '/' + additionalParams : ''}`);
  }

  fullData(userId: number) {
    return this.fetchData('get', userId.toString());
  }

  signup(email: string, password: string): Promise<ILoginResult> {
    const body = {
      email: email,
      password: password,
      grantType: 'password'
    };
    return this.fetchData('post', 'sign-up', body);
  }

  anonymous(): Promise<ILoginResult> {
    return this.fetchData('post', 'anonymous');
  }

  login(email: string, password: string): Promise<ILoginResult> {
    const body = {
      email: email,
      password: password,
      grantType: 'password'
    };
    return this.fetchData('post', 'login', body);
  }

  logout(): Promise<null> {
    return this.fetchData('get', 'logout');
  }

  refresh(refreshToken: string): Promise<ILoginResult> {
    const body = {
      token: refreshToken,
      grantType: 'refresh_token'
    };
    return this.fetchData('post', 'login', body)
  }
}

class AEvent extends HttpBase {
  constructor(token?: string) {
    super(`${settings.mainApi}/events`, token);
  }

  pagination(page: number, pageSize: number, additionalParams?: number) {
    return this.fetchData('get', `${page}/${pageSize}${additionalParams ? '' + additionalParams : ''}`);
  }

}

class App extends HttpBase {
  constructor(token?: string) {
    super(`${settings.mainApi}/apps`, token);
  }

  pagination(page: number, pageSize: number, additionalParams?: number) {
    return this.fetchData('get', `${page}/${pageSize}${additionalParams ? '' + additionalParams : ''}`);
  }

  fullData(appId: number) {
    return this.fetchData('get', appId.toString());
  }

}
