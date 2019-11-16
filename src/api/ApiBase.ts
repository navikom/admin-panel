
export abstract class ApiBase {
  token?: string;

  protected constructor(token?: string) {
    this.token = token;
  }
}
