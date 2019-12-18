import { VariantType } from "interfaces/IVariant";
import { ISegment } from "interfaces/ISegment";
import { AMType, EmailType, InAppType, PMType, PushType, SmsType } from "types/commonTypes";

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

interface IOneTimeRun extends IRunType {
  now: boolean;
  later: Date;
  userTimezone: boolean;
  appTimezone: boolean
}

interface ITriggerRun extends IRunType {
  eventName: string;
  sendAsOccurs: boolean;
  waitMilliseconds: number
}

interface IRecurringRun extends IRunType {
  reoccur: IMonthly | IDaily | IHourly;
}

interface IConversion {
  event: string;
  deadlineFromDeliveryMessage: number
}

export interface ICampaign {
  campaignId: number;
  name: string;
  runType: IOneTimeRun | ITriggerRun | IRecurringRun;
  channelType: ChannelType;
  onlyForSubscribed: boolean;
  segments: ISegment[];
  excludeSegments: ISegment[];
  frequencyCap: boolean;
  startDate: Date;
  endDate: Date | null;
  targetAndroidApps: string[];
  targetIOSApps: string[];
  conversion: IConversion | null;
  variants: VariantType[];
}
