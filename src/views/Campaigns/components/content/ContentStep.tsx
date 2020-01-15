import React from "react";

// models
import {EMAIL_CHANNEL, IN_APP_CHANNEL, PUSH_CHANNEL, SMS_CHANNEL} from "models/Constants";

// view stores
import CampaignViewStore from "views/Campaigns/store/CampaignViewStore";

// utils
import {lazy} from "utils";
import WaitingComponent from "hocs/WaitingComponent";

// channel components
const EmailComponent = lazy(() => import("views/Campaigns/components/content/EmailComponent"));
const SMSComponent = lazy(() => import("views/Campaigns/components/content/SMSComponent"));
const InAppComponent = lazy(() => import("views/Campaigns/components/content/InAppComponent"));
const PushComponent = lazy(() => import("views/Campaigns/components/content/PushComponent"));


const ChannelComponents = {
 [EMAIL_CHANNEL]: EmailComponent,
 [SMS_CHANNEL]: SMSComponent,
 [IN_APP_CHANNEL]: InAppComponent,
 [PUSH_CHANNEL]: PushComponent
};

export default () => {
 const store = CampaignViewStore.contentStepStore;
 if (!store) return null;

 return React.createElement(WaitingComponent(ChannelComponents[store.channel]));
};
