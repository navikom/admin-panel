import {Headers, Body} from "interfaces/Request";
import { request } from "api/httpRequest";

export abstract class HttpBase {
  url: string;
  token?: string;
  debug: boolean = true;
  currentRequests: {[k: string]: any} = {};

  protected constructor(url: string, token?: string) {
    this.url = url;
    this.token = token;
  }

  pagination(page: number, pageSize: number, additionalParams?: number) {
    return this.fetchData("get", `${page}/${pageSize}${additionalParams ? "" + additionalParams : ""}`);
  }

  fullData(id: number) {
    return this.fetchData("get", id.toString());
  }

  list() {
    return this.fetchData("get");
  }

  add(body: {[k: string]: any}) {
    return this.fetchData("post", undefined, body);
  }

  update(id: number, body: {[k: string]: any}) {
    return this.fetchData("put", id.toString(), body);
  }

  delete(id: number) {
    return this.fetchData("delete", id.toString());
  }

  fetchData(method: string, calMethod?: string, body?: Body, header: Headers = {}, excludeHeaders?: string[]) {
    if (this.token) {
      header.authorization = this.token;
    }
    const url = calMethod ? `${this.url}/${calMethod}` : this.url;
    return request(method, url, header, body, excludeHeaders, this.debug);
  }
}
