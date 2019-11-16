import {Headers, Body} from "interfaces/Request";
import { request } from "api/httpRequest";

export abstract class HttpBase {
  url: string;
  token?: string;
  debug: boolean = true;

  protected constructor(url: string, token?: string) {
    this.url = url;
    this.token = token;
  }

  fetchData(method: string, calMethod?: string, body?: Body, header: Headers = {}) {
    if (this.token) {
      header.authorization = this.token;
    }
    const url = calMethod ? `${this.url}/${calMethod}` : this.url;
    return request(method, url, header, body, this.debug);
  }
}
