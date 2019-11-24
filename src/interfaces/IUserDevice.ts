import { IDevice } from "interfaces/IDevice";

export interface IUserDevice {
  deviceId: number;
  createdAt: Date;
  device: IDevice;
}
