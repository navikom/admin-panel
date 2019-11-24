import { IDeviceInfo } from "interfaces/IDeviceInfo";

export interface IDevice {
  info: IDeviceInfo;
  createdAt: Date;
  planeData: string[][];
}
