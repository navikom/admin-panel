import {
  DateExpressionType, NumberExpressionType, StringExpressionType

} from "interfaces/IExpressions";

export interface ISegmentDevice {
  appInstallationDate?: DateExpressionType;
  lastSeen?: DateExpressionType;
  totalTimeSpent?: NumberExpressionType;
  appVersionName?: StringExpressionType;
  appId?: StringExpressionType;
  appVersionCode?: NumberExpressionType;
  advertisingId?: NumberExpressionType;
  apiVersion?: NumberExpressionType;
  sdkVersion?: NumberExpressionType;
  model?: StringExpressionType;
  locale?: StringExpressionType;
}

export interface IAndroidDevice extends ISegmentDevice {
  androidId?: NumberExpressionType;
  manufacturer?: StringExpressionType;
  brand?: StringExpressionType;
}

export interface IIOSDevice extends ISegmentDevice {
  vendorId?: NumberExpressionType;
}
