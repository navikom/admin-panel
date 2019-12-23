import { ChannelCampaigns } from "models/Campaign/ChannelCampaigns";
import { IChannelCampaigns } from "interfaces/IChannelCampaigns";
import { ICampaign } from "interfaces/ICampaign";
import { IN_APP_CAMPAIGN, IN_APP_CHANNEL, SMS_CHANNEL } from "models/Constants";

class InAppCampaignsStore extends ChannelCampaigns implements IChannelCampaigns<ICampaign> {
  title: string = IN_APP_CAMPAIGN;

  constructor() {
    super(`/${IN_APP_CHANNEL}`);
  }
}

export const InAppCampaigns = new InAppCampaignsStore();
