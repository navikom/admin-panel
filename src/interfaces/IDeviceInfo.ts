export interface IDeviceInfoData {
  name: string;
  version: string;
}
export interface IDeviceInfo {
  BROWSER: IDeviceInfoData,
  OS: IDeviceInfoData,
  headers: string[];
}
