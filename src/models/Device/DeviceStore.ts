import { IDevice } from "interfaces/IDevice";
import { IDeviceInfo } from "interfaces/IDeviceInfo";

export class DeviceStore implements IDevice {
  createdAt: Date;
  info: IDeviceInfo;

  get planeData() {
    const data = [
      ["OS", `${this.info.OS.name}, ${this.info.OS.version}`],
    ];
    this.info.BROWSER && data.push(["BROWSER", `${this.info.BROWSER.name}, ${this.info.BROWSER.version}`]);
    this.info.headers && this.info.headers[0] && data.push(["OTHERS", this.info.headers[0]]);
    return data;
  }

  constructor(model:IDevice) {
    this.info = model.info;
    this.createdAt = model.createdAt;
  }

  static from (model: IDevice) {
    return new DeviceStore(model);
  }
}
