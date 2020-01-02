
import { IDateFilter, INumberFilter, IStringFilter } from "interfaces/IFilters.ts";

export interface ISegmentDevice {
  appInstallationDate?: IDateFilter;
  lastSeen?: IDateFilter;
  totalTimeSpent?: INumberFilter;
  appVersionName?: IStringFilter;
  appId?: IStringFilter;
  appVersionCode?: INumberFilter;
  advertisingId?: INumberFilter;
  apiVersion?: INumberFilter;
  sdkVersion?: INumberFilter;
  model?: IStringFilter;
  locale?: IStringFilter;
}

export interface IAndroidDevice extends ISegmentDevice {
  androidId?: INumberFilter;
  manufacturer?: IStringFilter;
  brand?: IStringFilter;
}

export interface IIOSDevice extends ISegmentDevice {
  vendorId?: INumberFilter;
}
