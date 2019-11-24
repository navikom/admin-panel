import { IEventInfo } from "interfaces/IEventInfo";
import { IDevice } from "interfaces/IDevice";
import { IRegion } from "interfaces/IRegion";
import { DeviceStore } from "models/Device/DeviceStore";
import { RegionStore } from "models/RegionStore";
import { IApp } from "interfaces/IApp";
import { AppStore } from "models/App/AppStore";

export class EventInfoStore implements IEventInfo {
  app: IApp | null = null;
  data: { [p: string]: any } | null = null;
  device: IDevice;
  region: IRegion;

  constructor(model: IEventInfo) {
    Object.assign(this, model);
    this.device = model.device;
    this.region = model.region;
  }

  static from(model: IEventInfo) {
    model.device = DeviceStore.from(model.device);
    model.region = RegionStore.from(model.region);
    model.app = model.app ? AppStore.from(model.app) : null;
    return new EventInfoStore(model);
  }
}
