import { IUser } from "interfaces/IUser";

export interface ILoginResult {
  token: string;
  refreshToken: string;
  expires: number;
  user: IUser;
}
