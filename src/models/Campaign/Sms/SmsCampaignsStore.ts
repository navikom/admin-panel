import { ChannelCampaigns } from "models/Campaign/ChannelCampaigns";
import { IChannelCampaigns } from "interfaces/IChannelCampaigns";
import { ICampaign } from "interfaces/ICampaign";
import { SMS_CAMPAIGN, SMS_CHANNEL } from "models/Constants";

class SmsCampaignsStore extends ChannelCampaigns implements IChannelCampaigns<ICampaign> {
  title: string = SMS_CAMPAIGN;

  constructor() {
    super(`/${SMS_CHANNEL}`);
  }
}

export const SmsCampaigns = new SmsCampaignsStore();
