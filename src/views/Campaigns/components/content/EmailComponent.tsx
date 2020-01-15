import React from "react";
import {observer} from "mobx-react-lite";
import classNames from "classnames";

// @material-ui/core
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";

// @material-ui/icons
import {Person, Clear, InsertEmoticon} from "@material-ui/icons";

// core components
import Card from "components/Card/Card";
import CardBody from "components/Card/CardBody";
import CardHeader from "components/Card/CardHeader";
import InputWithIcon from "components/CustomInput/InputWithIcon";

// interfaces
import {ContentEmailPropsType, IContentEmailView} from "interfaces/IContentStep";

// view stores
import CampaignViewStore from "views/Campaigns/store/CampaignViewStore";

// services
import {Dictionary, DictionaryService} from "services/Dictionary/Dictionary";

// components
import AttributesEventsListPopper from "components/Poppers/AttributesEventsListPopper";

// styles
import useStyles from "assets/jss/material-dashboard-react/components/inputFieldStyle";
import cardStyles from "assets/jss/material-dashboard-react/views/cardStyle";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import EmojiPopper from "components/Poppers/EmojiPopper";

const extraStyles = makeStyles((theme: Theme) =>
  createStyles({
   divider: {
    height: theme.typography.pxToRem(30)
   },
   container: {
    marginTop: theme.typography.pxToRem(20)
   },
   label: {
    width: theme.typography.pxToRem(200),
    marginRight: theme.typography.pxToRem(30)
   }
  }));

export default observer(() => {
 const contentStepStore = CampaignViewStore.contentStepStore;
 if (!contentStepStore) return null;
 const store = contentStepStore.store as IContentEmailView;

 const classes = useStyles();
 const cardClasses = cardStyles();
 const extraClasses = extraStyles();
 const centerNote = classNames(classes.note, classes.center, classes.textToRight, extraClasses.label);

 const onInput = (key: ContentEmailPropsType) => (e: React.ChangeEvent<HTMLInputElement> | string) => {
  store.onInput(key, typeof e === "string" ? store[key] + e : e.target.value);
 };

 const onClear = (key: ContentEmailPropsType) => () => {
  store.onInput(key, "");
 };

 const onVariableClick = (key: ContentEmailPropsType) => (e: React.MouseEvent<HTMLButtonElement>) => {
  store.variablesPopperStore.handleClick(e.currentTarget, onInput(key));
 };

 const onEmojiClick = (key: ContentEmailPropsType) => (e: React.MouseEvent<HTMLButtonElement>) => {
  store.emojiStore.handleClick(e.currentTarget, onInput(key));
 };

 return (
   <div className={classes.root}>
    <Card>
     <CardHeader color="inherit">
      <h4 className={cardClasses.cardTitleBlack}>
       {Dictionary.defValue(DictionaryService.keys.from).toUpperCase()}
      </h4>
     </CardHeader>
     <CardBody>
      <Grid container>
       <Grid container item direction="row" className={extraClasses.container}>
        <Typography variant="subtitle2" className={centerNote}>
         {Dictionary.defValue(DictionaryService.keys.name)}
        </Typography>
        <Grid item xs={12} sm={12} md={6}>
         <FormControl fullWidth>
          <InputWithIcon
            divider={{className: extraClasses.divider}}
            value={store.fromName}
            onChange={onInput("fromName")}
            endAdornments={[
             {component: <Clear />, onClick: onClear("fromName")},
             {component: <Person />, onClick: onVariableClick("fromName")}
            ]} />
         </FormControl>
        </Grid>
       </Grid>
       <Grid container item direction="row" className={extraClasses.container}>
        <Typography variant="subtitle2" className={centerNote}>
         {Dictionary.defValue(DictionaryService.keys.email)}
        </Typography>
        <Grid item xs={12} sm={12} md={6}>
         <FormControl fullWidth>
          <InputWithIcon
            divider={{className: extraClasses.divider}}
            value={store.fromEmail}
            onChange={onInput("fromEmail")}
            endAdornments={[
             {component: <Clear />, onClick: onClear("fromEmail")},
             {component: <Person />, onClick: onVariableClick("fromEmail")}
            ]}
          />
         </FormControl>
        </Grid>
       </Grid>
      </Grid>
     </CardBody>
    </Card>
    <Card>
     <CardHeader color="inherit">
      <h4 className={cardClasses.cardTitleBlack}>
       {Dictionary.defValue(DictionaryService.keys.message).toUpperCase()}
      </h4>
     </CardHeader>
     <CardBody>
      <Grid container>
       <Grid container item direction="row" className={extraClasses.container}>
        <Typography variant="subtitle2" className={centerNote}>
         {Dictionary.defValue(DictionaryService.keys.subject)}
        </Typography>
        <Grid item xs={12} sm={12} md={6}>
         <FormControl fullWidth>
          <InputWithIcon
            divider={{className: extraClasses.divider}}
            value={store.subject}
            onChange={onInput("subject")}
            endAdornments={[
             {component: <Clear />, onClick: onClear("subject")},
             {component: <InsertEmoticon />, onClick: onEmojiClick("subject")},
             {component: <Person />, onClick: onVariableClick("subject")}
            ]}
          />
         </FormControl>
        </Grid>
       </Grid>
      </Grid>
     </CardBody>
    </Card>
    <Card>
     <CardHeader color="inherit">
      <h4 className={cardClasses.cardTitleBlack}>
       {Dictionary.defValue(DictionaryService.keys.attachments).toUpperCase()}
      </h4>
     </CardHeader>
     <CardBody>

     </CardBody>
    </Card>
    <AttributesEventsListPopper store={store.variablesPopperStore} />
    <EmojiPopper store={store.emojiStore}/>
   </div>
 );
});
