import {computed, observable} from "mobx";

// models
import {EMAIL_CHANNEL, IN_APP_CHANNEL, PUSH_CHANNEL, SMS_CHANNEL} from "models/Constants";

// interfaces
import {ContentChannelsType, IContentStep} from "interfaces/IContentStep";
import {ChannelType} from "types/commonTypes";

// stores
import {ContentEmailViewStore} from "views/Campaigns/store/ContentEmailViewStore";
import {ContentSMSViewStore} from "views/Campaigns/store/ContentSMSViewStore";
import {ContentInAppViewStore} from "views/Campaigns/store/ContentInAppViewStore";
import {ContentPushViewStore} from "views/Campaigns/store/ContentPushViewStore";

export class ContentStepStore implements IContentStep {
 static channelStores = {
  [EMAIL_CHANNEL]: ContentEmailViewStore,
  [SMS_CHANNEL]: ContentSMSViewStore,
  [IN_APP_CHANNEL]: ContentInAppViewStore,
  [PUSH_CHANNEL]: ContentPushViewStore
 };
 channel: ChannelType;
 @observable store: ContentChannelsType;

 @computed get isValidStep(): boolean {
  return true;
 }

 constructor(channelType: ChannelType) {
  this.channel = channelType;
  this.store = new ContentStepStore.channelStores[channelType]();
 }

}
