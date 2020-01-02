import { action, observable } from "mobx";

// interfaces
import { ICampaign } from "interfaces/ICampaign";

// models
import { CampaignStore } from "models/Campaign/CampaignStore";
import { Campaigns } from "models/Campaign/CampaignsStore";
import {
  AUDIENCE_CAMPAIGN_STEP,
  CONTENT_CAMPAIGN_STEP,
  CONVERSION_CAMPAIGN_STEP, LAUNCH_CAMPAIGN_STEP, TEST_CAMPAIGN_STEP,
  WHEN_TO_SEND_CAMPAIGN_STEP
} from "models/Constants";
import { Errors } from "models/Errors";

// services
import { Dictionary, DictionaryService } from "services/Dictionary/Dictionary";
import { ChannelType } from "types/commonTypes";

const constraints = {
  name: {
    presence: {
      message: `^${Dictionary.defValue(DictionaryService.keys.cantBeEmpty, Dictionary.defValue(DictionaryService.keys.name))}`
    },
    length: {
      maximum: 100,
      message: `^${Dictionary.defValue(DictionaryService.keys.cantBeMoreThan, 
        [Dictionary.defValue(DictionaryService.keys.name), "100"])}`
    }
  }
};

class CampaignViewStore extends Errors {
  @observable campaign?: ICampaign;
  @observable activeStep: number = 0;

  steps: string[] = [AUDIENCE_CAMPAIGN_STEP, WHEN_TO_SEND_CAMPAIGN_STEP, CONTENT_CAMPAIGN_STEP,
    CONVERSION_CAMPAIGN_STEP, TEST_CAMPAIGN_STEP, LAUNCH_CAMPAIGN_STEP];

  @action handleStep = (step: number) => () => {
    this.setActiveStep(step);
  };

  @action setActiveStep(value: number) {
    this.activeStep = value;
  }

  @action setCampaign(campaignId: number, channelType: ChannelType) {
    this.campaign = campaignId === 0 ?
      CampaignStore.from({ campaignId, channelType } as ICampaign) :
      Campaigns.currentStore!.getById(campaignId);
  }
}

export default new CampaignViewStore();
