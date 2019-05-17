import config from "config/server";
import { request } from "../httpRequest";

export class ServerApi {
  constructor() {
    this.url = config.url;
    this.action = "commandrun";
  }

  callShell(body) {
    return request("post", `${this.url}/${this.action}`, body);
  }
}
