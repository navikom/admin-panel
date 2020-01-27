import React, {useState} from "react";
import classNames from "classnames";
import moment from "moment";

// @material-ui/icons
import {Android, Apple} from "@material-ui/icons";

// @material-ui/core
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

// assets
import AndroidWrapper from "assets/img/device/gpixel_outer.png";
import IOSWrapper from "assets/img/device/iphone_6_outer.png";
import SMSChannelComponent from "views/Campaigns/components/content/device/SMSChannelComponent";
import {MobileVariantType} from "interfaces/IVariant";
import {SMS_CHANNEL} from "models/Constants";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
   root: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default
   },
   wrapper: {
    position: "relative",
    width: theme.typography.pxToRem(303),
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%",
    marginTop: theme.spacing(2)
   },
   inner: {
    position: "absolute",
    top: theme.typography.pxToRem(72),
    left: theme.typography.pxToRem(19),
    width: "calc(100% - 38px)",
    backgroundRepeat: "no-repeat",
    backgroundSize: "100%"
   }
  }));

const androidStyles = makeStyles((theme: Theme) =>
  createStyles({
   wrapper: {
    height: theme.typography.pxToRem(617),
    backgroundImage: `url(${AndroidWrapper})`
   }
  }));

const iosStyles = makeStyles((theme: Theme) =>
  createStyles({
   wrapper: {
    height: theme.typography.pxToRem(620),
    backgroundImage: `url(${IOSWrapper})`
   }
  }));

type DeviceType = {
 ios: boolean;
 variant: MobileVariantType
}

function OtherChannelsComponent(props: DeviceType) {

 return(
   <div></div>
 )
}

function DeviceComponent(props: DeviceType) {
 const {ios, variant} = props;
 const classes = useStyles();
 const extraClasses = ios ? iosStyles() : androidStyles();
 const wrapper = classNames(classes.wrapper, extraClasses.wrapper);
 return (
   <div className={wrapper}>
    {variant.channel === SMS_CHANNEL ? <SMSChannelComponent {...props}/> : <OtherChannelsComponent {...props}/>}
   </div>
 );
}

function MobileDeviceComponent(props: {variant: MobileVariantType}) {

 const [ios, setIOS] = useState(true);
 const classes = useStyles();
 return (
   <Grid container className={classes.root} justify="center">
    <Grid container justify="flex-end">
     <ButtonGroup variant="outlined" size="small">
      <Button color={ios ? "default" : "primary"} onClick={() => setIOS(false)}>
       <Android />
      </Button>
      <Button color={!ios ? "default" : "primary"} onClick={() => setIOS(true)}>
       <Apple />
      </Button>
     </ButtonGroup>
    </Grid>
    <DeviceComponent ios={ios} {...props}/>
   </Grid>
 );
}

export default MobileDeviceComponent;
