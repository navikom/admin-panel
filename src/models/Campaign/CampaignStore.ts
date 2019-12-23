import { ChannelType, ICampaign, IConversion, IOneTimeRun, IRecurringRun, ITriggerRun } from "interfaces/ICampaign";
import { ISegment } from "interfaces/ISegment";
import { VariantType } from "interfaces/IVariant";
import { action } from "mobx";

export class CampaignStore implements ICampaign {
  campaignId?: number;
  channelType?: ChannelType;
  conversion: IConversion | null = null;
  endDate?: Date | null;
  excludeSegments?: ISegment[];
  frequencyCap: boolean = false;
  name?: string;
  onlyForSubscribed: boolean = false;
  runType?: IOneTimeRun | ITriggerRun | IRecurringRun;
  segments?: ISegment[];
  startDate?: Date;
  targetAndroidApps?: string[];
  targetIOSApps?: string[];
  variants?: VariantType[];
  pk: string = "campaignId";

  @action update(model: CampaignStore) {
    Object.assign(this, model);
  }

  static from(model: CampaignStore) {
    return new CampaignStore();
  }

}
