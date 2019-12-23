import { ChannelCampaigns } from "models/Campaign/ChannelCampaigns";
import { IChannelCampaigns } from "interfaces/IChannelCampaigns";
import { ICampaign } from "interfaces/ICampaign";
import { EMAIL_CAMPAIGN, EMAIL_CHANNEL, SMS_CHANNEL } from "models/Constants";

class EmailCampaignsStore extends ChannelCampaigns implements IChannelCampaigns<ICampaign> {
  title: string = EMAIL_CAMPAIGN;
  constructor() {
    super(`/${EMAIL_CHANNEL}`);
  }
}

export const EmailCampaigns = new EmailCampaignsStore();
