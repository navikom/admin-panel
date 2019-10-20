import { ApiBase } from "api/ApiBase";
import { HttpBase } from "api/HttpBase";
import { LoginResultModel } from "api/ModelTypes";
import settings from 'config/server';

export default class Api extends ApiBase {
  constructor(token?: string) {
    super(token);
  }

  user(): User {
    return new User(this.token);
  }

}

class User extends HttpBase {
  constructor(token?: string) {
    super(`${settings.pixelArtApi}/users`, token);
  }

  login(email: string, password: string): Promise<LoginResultModel> {
    const body = {
      email: email,
      password: password,
      grantType: 'password'
    };
    return this.fetchData('post', 'login', body);
  }

  refresh(refreshToken: string): Promise<LoginResultModel> {
    const body = {
      Token: refreshToken,
      GrantType: 'refresh_token'
    };
    return this.fetchData('post', 'login', body)
  }
}
