import MainApi from "api/MainApi/Api";
import { Auth } from "models/Auth/Auth";
import { ErrorHandler } from "utils/ErrorHandler";

export enum Apis {
  Main,
}
export function api(type: Apis) {
  if(Auth.token === null) {
    throw new ErrorHandler('Token is null');
  }
  if (type === Apis.Main) {
      return new MainApi(Auth.token);
  }
  throw new ErrorHandler('There is not Api type provided');
}

export function nonAuthorizedApi(type: Apis) {
  if (type === Apis.Main) {
    return new MainApi();
  }
  throw new ErrorHandler('There is not Api type provided');
}
