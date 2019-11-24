import { IRegion } from "interfaces/IRegion";
import { IDevice } from "interfaces/IDevice";
import { IApp } from "interfaces/IApp";

export interface IEventInfo {
  data: {[key: string]: any} | null;
  app: IApp | null;
  region: IRegion;
  device: IDevice;
}
