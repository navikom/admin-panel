import { ChannelCampaigns } from "models/Campaign/ChannelCampaigns";
import { IChannelCampaigns } from "interfaces/IChannelCampaigns";
import { ICampaign } from "interfaces/ICampaign";
import { PUSH_CAMPAIGN, PUSH_CHANNEL, SMS_CHANNEL } from "models/Constants";

class PushCampaignsStore extends ChannelCampaigns implements IChannelCampaigns<ICampaign> {
  title: string = PUSH_CAMPAIGN;

  constructor() {
    super(`/${PUSH_CHANNEL}`);
  }
}

export const PushCampaigns = new PushCampaignsStore();
