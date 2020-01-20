import {action, computed, observable} from "mobx";

// interfaces
import {IAudienceStep} from "interfaces/IAudienceStep";
import {ICampaign} from "interfaces/ICampaign";
import {IWhenToSendStep} from "interfaces/IWhenToSendStep";
import {ITestStep} from "interfaces/ITestStep";
import {IConversionStep} from "interfaces/IConversionStep";
import {IContentStep} from "interfaces/IContentStep";
import {ILaunchStep} from "interfaces/ILaunchStep";

// models
import {CampaignStore} from "models/Campaign/CampaignStore";
import {Campaigns} from "models/Campaign/CampaignsStore";
import {
 AUDIENCE_CAMPAIGN_STEP,
 CONTENT_CAMPAIGN_STEP,
 CONVERSION_CAMPAIGN_STEP, LAUNCH_CAMPAIGN_STEP, TEST_CAMPAIGN_STEP,
 WHEN_TO_SEND_CAMPAIGN_STEP
} from "models/Constants";
import {Errors} from "models/Errors";

// services
import {ChannelType} from "types/commonTypes";

// step stores
import {AudienceStepStore} from "views/Campaigns/store/AudienceStepStore";
import {WhenToSendViewStore} from "views/Campaigns/store/WhenToSendViewStore";
import {ContentStepStore} from "views/Campaigns/store/ContentStepStore";
import {ConversionStepStore} from "views/Campaigns/store/ConversionStepStore";
import {TestStepStore} from "views/Campaigns/store/TestStepStore";
import {LaunchStepStore} from "views/Campaigns/store/LaunchStepStore";


class CampaignViewStore extends Errors {
 @observable campaign?: ICampaign;
 @observable activeStep: number = 0;
 @observable audienceStepStore?: IAudienceStep;
 @observable whenToRunStepStore?: IWhenToSendStep;
 @observable contentStepStore?: IContentStep;
 @observable conversionStepStore?: IConversionStep;
 @observable testStepStore?: ITestStep;
 @observable launchStepStore?: ILaunchStep;

 steps: string[] = [AUDIENCE_CAMPAIGN_STEP, WHEN_TO_SEND_CAMPAIGN_STEP, CONTENT_CAMPAIGN_STEP,
  CONVERSION_CAMPAIGN_STEP, TEST_CAMPAIGN_STEP, LAUNCH_CAMPAIGN_STEP];

 @computed get isNextButtonAvailable(): boolean {
  const steps = [this.audienceStepStore, this.whenToRunStepStore, this.contentStepStore];
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
    CampaignStore.from({campaignId, channelType} as ICampaign) :
    Campaigns.currentStore!.getById(campaignId);
  this.bindStores();
 }

 @action bindStores() {
  this.audienceStepStore = new AudienceStepStore();
  this.whenToRunStepStore = new WhenToSendViewStore();
  this.contentStepStore = new ContentStepStore(this.campaign!.channelType);
  this.conversionStepStore = new ConversionStepStore();
  this.testStepStore = new TestStepStore();
  this.launchStepStore = new LaunchStepStore();
 }

}

export default new CampaignViewStore();
