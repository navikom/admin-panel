import React from "react";

// models
import {EMAIL_CHANNEL, IN_APP_CHANNEL, PUSH_CHANNEL, SMS_CHANNEL} from "models/Constants";

// view stores
import CampaignViewStore from "views/Campaigns/store/CampaignViewStore";

// utils
import {lazy} from "utils";
import WaitingComponent from "hocs/WaitingComponent";
import {makeStyles, Theme} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import {ContentChannelsType} from "interfaces/IContentStep";
import {AddCircleOutline} from "@material-ui/icons";
import {observer} from "mobx-react-lite";

// channel components
const EmailComponent = lazy(() => import("views/Campaigns/components/content/EmailComponent"));
const SMSComponent = lazy(() => import("views/Campaigns/components/content/SMSComponent"));
const InAppComponent = lazy(() => import("views/Campaigns/components/content/InAppComponent"));
const PushComponent = lazy(() => import("views/Campaigns/components/content/PushComponent"));


const useStyles = makeStyles((theme: Theme) => ({
 root: {
  marginTop: theme.typography.pxToRem(10),
  flexGrow: 1,
  width: '100%',
 },
 bar: {
  marginBottom: theme.typography.pxToRem(10)
 },
 tabButton: {
  minWidth: 0,
  "&:hover": {
   color: "rgba(0,0,0,.8)"
  }
 }
}));

const ChannelComponents = {
 [EMAIL_CHANNEL]: EmailComponent,
 [SMS_CHANNEL]: SMSComponent,
 [IN_APP_CHANNEL]: InAppComponent,
 [PUSH_CHANNEL]: PushComponent
};

export default observer(() => {
 const store = CampaignViewStore.contentStepStore;
 if (!store) return null;

 const classes = useStyles();

 return (
   <div className={classes.root}>
    <AppBar position="static" color="default" className={classes.bar}>
     <Tabs
       value={store.currentVariant}
       onChange={(e: any, i: number) => store.setCurrentVariant(i)}
       indicatorColor="primary"
       textColor="primary"
       variant="scrollable"
       scrollButtons="auto"
       aria-label="scrollable auto tabs example"
     >
      {
       store!.variants.map((prop: ContentChannelsType, i: number) => (
         <Tab key={i} label={`Variant ${i + 1}`} id={`scrollable-auto-tab-${i}`} aria-controls={`scrollable-auto-tabpanel-${i}`} />
       ))
      }
      <Tab
        className={classes.tabButton}
        disableRipple={true}
        disableFocusRipple={true}
        icon={<AddCircleOutline />} aria-label="add"
        color="primary"
        onClick={() => store!.addStore()}/>
     </Tabs>
    </AppBar>
    {
     React.createElement(WaitingComponent(ChannelComponents[store.channel]), {store: store!.currentStore})
    }
   </div>
 )
});
