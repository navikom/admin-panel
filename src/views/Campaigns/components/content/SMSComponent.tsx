import React from "react";
import {observer} from "mobx-react-lite";
import classNames from "classnames";

// @material-ui/core
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

// interfaces
import {IContentSMSView} from "interfaces/IContentStep";

// view stores
import CampaignViewStore from "views/Campaigns/store/CampaignViewStore";

// services
import {Dictionary, DictionaryService} from "services/Dictionary/Dictionary";

// components
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import FiltarableComponent from "components/Filter/FiltarableComponent";

import useStyles from "assets/jss/material-dashboard-react/components/inputFieldStyle";
import cardStyles from "assets/jss/material-dashboard-react/views/cardStyle";

const extraStyles = makeStyles((theme: Theme) =>
  createStyles({
   container: {
    marginTop: theme.typography.pxToRem(20)
   },
   label: {
    width: theme.typography.pxToRem(200),
    marginRight: theme.typography.pxToRem(30)
   }
  }));

const SMSComponent = (props: {store: IContentSMSView}) => {
 const store = props.store;

 const classes = useStyles();
 const cardClasses = cardStyles();
 const extraClasses = extraStyles();
 const centerNote = classNames(classes.note, classes.center, classes.textToRight, extraClasses.label);

 const first = {

 };

 return (
   <div className={classes.root}>
    <Card>
     <CardHeader  color="inherit">
      <h4 className={cardClasses.cardTitleBlack}>
       {Dictionary.defValue(DictionaryService.keys.message).toUpperCase()}
      </h4>
     </CardHeader>
     <CardBody>

     </CardBody>
    </Card>
   </div>
 )
};

export default observer(SMSComponent);
