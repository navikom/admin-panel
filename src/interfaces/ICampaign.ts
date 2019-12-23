import { VariantType } from "interfaces/IVariant";
import { ISegment } from "interfaces/ISegment";
import { AMType, EmailType, InAppType, PMType, PushType, SmsType } from "types/commonTypes";
import { WithPrimaryKey } from "interfaces/WithPrimaryKey";

export type ChannelType = EmailType | SmsType | InAppType | PushType;

interface IHourly {
  hours: number;
  minutes: number;
}

interface IMonthly {
  day: number;
  time: IHourly;
  period: PMType | AMType;
}

interface IDaily {
  day: string;
  time: IHourly;
}

interface IRunType {
  name: string;
}

export interface IOneTimeRun extends IRunType {
  now: boolean;
  later: Date;
  userTimezone: boolean;
  appTimezone: boolean
}

export interface ITriggerRun extends IRunType {
  eventName: string;
  sendAsOccurs: boolean;
  waitMilliseconds: number
}

export interface IRecurringRun extends IRunType {
  reoccur: IMonthly | IDaily | IHourly;
}

export interface IConversion {
  event: string;
  deadlineFromDeliveryMessage: number
}

export interface ICampaign extends WithPrimaryKey {
  campaignId?: number;
  name?: string;
  runType?: IOneTimeRun | ITriggerRun | IRecurringRun;
  channelType?: ChannelType;
  onlyForSubscribed: boolean;
  segments?: ISegment[];
  excludeSegments?: ISegment[];
  frequencyCap: boolean;
  startDate?: Date;
  endDate?: Date | null;
  targetAndroidApps?: string[];
  targetIOSApps?: string[];
  conversion: IConversion | null;
  variants?: VariantType[];
  pk: string;
}
