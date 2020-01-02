import { VariantType } from "interfaces/IVariant";
import { ISegment } from "interfaces/ISegment";
import {
  AMType, ChannelType,
  EmailType,
  InAppType,
  PMType,
  PushType,
  RunType,
  SmsType
} from "types/commonTypes";
import { WithPrimaryKey } from "interfaces/WithPrimaryKey";

export interface IHourly {
  hours: number;
  minutes: number;
}

export interface IMonthly {
  day: number;
  time: IHourly;
  period: PMType | AMType;
}

export interface IDaily {
  day: string;
  time: IHourly;
}

export interface IRunType {
  readonly type: RunType;
}

export interface IOneTimeRun extends IRunType {
  now: boolean;
  later: Date;
  userTimezone: boolean;
  appTimezone: boolean
}

export interface ITriggerRun extends IRunType {
  eventName?: string;
  sendAsOccurs: boolean;
  startDate: Date;
  endDate?: Date | null;
}

export interface IRecurringRun extends IRunType {
  reoccur: IMonthly | IDaily | IHourly;
  startDate: Date;
  endDate?: Date | null;
}

export interface IConversion {
  event: string;
  deadlineFromDeliveryMessage: number
}

export interface ICampaign extends WithPrimaryKey {
  campaignId: number;
  readonly channelType: ChannelType;
  readonly pk: string;

  name?: string;
  runType: IOneTimeRun | ITriggerRun | IRecurringRun;
  onlyForSubscribed: boolean;
  segments?: ISegment[];
  excludeSegments?: ISegment[];
  frequencyCap: boolean;
  targetAndroidApps?: string[];
  targetIOSApps?: string[];
  conversion: IConversion | null;
  variants?: VariantType[];
}
