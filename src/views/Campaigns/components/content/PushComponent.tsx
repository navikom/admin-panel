import React, {useState} from "react";
import {observer} from "mobx-react-lite";
import classNames from "classnames";

// @material-ui/core
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";

// @material-ui/icons
import {Clear, InsertEmoticon, Person} from "@material-ui/icons";

// interfaces
import {ContentNotificationPropsType, IContentDevice} from "interfaces/IContentStep";

// services
import {Dictionary, DictionaryService} from "services/Dictionary/Dictionary";

// components
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";

import useStyles from "assets/jss/material-dashboard-react/components/inputFieldStyle";
import cardStyles from "assets/jss/material-dashboard-react/views/cardStyle";

import InputWithIcon from "components/CustomInput/InputWithIcon";

import MobileDeviceComponent from "views/Campaigns/components/content/device/MobileDeviceComponent";
import {insertSubstring} from "utils/string";
import AttributesEventsListPopper from "components/Poppers/AttributesEventsListPopper";
import EmojiPopper from "components/Poppers/EmojiPopper";
import {IPushMessage} from "interfaces/IVariant";

const extraStyles = makeStyles((theme: Theme) =>
  createStyles({
   root: {
    padding: theme.spacing(1)
   },
   container: {
    marginTop: theme.typography.pxToRem(20)
   },
   label: {
    width: theme.typography.pxToRem(150),
    marginRight: theme.typography.pxToRem(30)
   }
  }));

const PushComponent = (props: {store: IContentDevice}) => {

 const store = props.store;

 const [cursorIndex, setCursorIndex] = useState(0);

 const classes = useStyles();
 const cardClasses = cardStyles();
 const extraClasses = extraStyles();
 const centerNote = classNames(classes.note, classes.center, classes.textToRight, extraClasses.label);

 const data = store.variant.data as IPushMessage;

 const onInput = (key: ContentNotificationPropsType) => (e: React.ChangeEvent<HTMLInputElement> | string) => {
  store.onInput(key, typeof e === "string" ? insertSubstring(data[key], cursorIndex, e) : e.target.value);
 };

 const onClear = (key: ContentNotificationPropsType) => () => {
  store.onInput(key, "");
 };

 const onVariableClick = (key: ContentNotificationPropsType) => (e: React.MouseEvent<HTMLButtonElement> | HTMLButtonElement) => {
  store.variablesPopperStore
    .handleClick(e instanceof HTMLButtonElement ? e : e.currentTarget, onInput(key));
  store.emojiStore.clear();
 };

 const onEmojiClick = (key: ContentNotificationPropsType) => (e: React.MouseEvent<HTMLButtonElement> | HTMLButtonElement) => {
  store.emojiStore.handleClick(e instanceof HTMLButtonElement ? e : e.currentTarget, onInput(key));
  store.variablesPopperStore.clear();
 };

 return (
   <div className={extraClasses.root}>
    <Grid container>
     <Grid item xs={12} sm={12} md={8}>
      <Card>
       <CardHeader color="inherit" plain>
        <h4 className={cardClasses.cardTitleBlack}>
         {Dictionary.defValue(DictionaryService.keys.message).toUpperCase()}
        </h4>
       </CardHeader>
       <CardBody>
        <Grid container item direction="row" className={extraClasses.container}>
         <Typography variant="subtitle2" className={centerNote}>
          {Dictionary.defValue(DictionaryService.keys.title)}
         </Typography>
         <Grid item xs={12} sm={12} md={8}>
          <FormControl fullWidth>
           <InputWithIcon
             input={{error: store.hasError("title")}}
             cursorChange={setCursorIndex}
             value={data.title}
             onChange={onInput("title")}
             endAdornments={[
              {component: <Clear />, onClick: onClear("title")},
              {component: <InsertEmoticon />, onClick: onEmojiClick("title")},
              {component: <Person />, onClick: onVariableClick("title")}
             ]}
           />
          </FormControl>
         </Grid>
        </Grid>
        <Grid container item direction="row" className={extraClasses.container}>
         <Typography variant="subtitle2" className={centerNote}>
          {Dictionary.defValue(DictionaryService.keys.message)}
         </Typography>
         <Grid item xs={12} sm={12} md={8}>
          <FormControl fullWidth>
           <InputWithIcon
             multiline
             input={{error: store.hasError("message")}}
             cursorChange={setCursorIndex}
             value={store.variant.data.message}
             onChange={onInput("message")}
             endAdornments={[
              {component: <Clear />, onClick: onClear("message")},
              {component: <InsertEmoticon />, onClick: onEmojiClick("message")},
              {component: <Person />, onClick: onVariableClick("message")}
             ]}
           />
          </FormControl>
         </Grid>
        </Grid>
       </CardBody>
      </Card>
      <Card>
       <CardHeader color="inherit" plain>
        <h4 className={cardClasses.cardTitleBlack}>
         {Dictionary.defValue(DictionaryService.keys.keyValuePairs).toUpperCase()}
        </h4>
       </CardHeader>
       <CardBody>

       </CardBody>
      </Card>
     </Grid>
     <Grid item xs={12} sm={12} md={4}>
      <MobileDeviceComponent variant={store.variant} justify="flex-end"/>
     </Grid>
    </Grid>
    <AttributesEventsListPopper store={store.variablesPopperStore} />
    <EmojiPopper store={store.emojiStore} />
   </div>
 );
};

export default observer(PushComponent);
