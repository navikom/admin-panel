import Pixelart from "api/PixelArtApi/Api";
import { Auth } from "models/Auth/Auth";
import { ErrorHandler } from "utils/ErrorHandler";

export enum Apis {
  Pixelart,
}
export function api(type: Apis) {
  if(Auth.token === null) {
    throw new ErrorHandler('Token is null');
  }
  if (type === Apis.Pixelart) {
      return new Pixelart(Auth.token);
  }
  throw new ErrorHandler('There is not Api type provided');
}

export function nonAuthorizedApi(type: Apis) {
  if (type === Apis.Pixelart) {
    return new Pixelart();
  }
  throw new ErrorHandler('There is not Api type provided');
}
