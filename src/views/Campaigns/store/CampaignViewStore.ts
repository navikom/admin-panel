import { action, computed, observable } from "mobx";

// interfaces
import { IAudienceStep } from "interfaces/IAudienceStep";
import { ICampaign } from "interfaces/ICampaign";
import { IWhenToSendStep } from "interfaces/IWhenToSendStep";

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
import { ChannelType } from "types/commonTypes";

// step stores
import { AudienceStepStore } from "views/Campaigns/store/AudienceStepStore";
import { WhenToSendViewStore } from "views/Campaigns/store/WhenToSendViewStore";

class CampaignViewStore extends Errors {
  @observable campaign?: ICampaign;
  @observable activeStep: number = 0;
  @observable audienceStepStore?: IAudienceStep;
  @observable whenToRunStepStore?: IWhenToSendStep;

  steps: string[] = [AUDIENCE_CAMPAIGN_STEP, WHEN_TO_SEND_CAMPAIGN_STEP, CONTENT_CAMPAIGN_STEP,
    CONVERSION_CAMPAIGN_STEP, TEST_CAMPAIGN_STEP, LAUNCH_CAMPAIGN_STEP];

  @computed get isNextButtonAvailable(): boolean {
    const steps = [this.audienceStepStore, this.whenToRunStepStore];
    return steps[this.activeStep] !== undefined && steps[this.activeStep]!.isValidStep;
  }

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
    this.bindStores();
  }

  @action bindStores() {
    this.audienceStepStore = new AudienceStepStore();
    this.whenToRunStepStore = new WhenToSendViewStore();
  }


}

export default new CampaignViewStore();
