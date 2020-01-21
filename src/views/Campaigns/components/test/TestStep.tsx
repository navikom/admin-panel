import React from "react";
import classNames from "classnames";
import CardBody from "components/Card/CardBody";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Dictionary, DictionaryService} from "services/Dictionary/Dictionary";
import Card from "components/Card/Card";
import CampaignViewStore from "views/Campaigns/store/CampaignViewStore";
import useStyles from "assets/jss/material-dashboard-react/components/inputFieldStyle";
import {observer} from "mobx-react-lite";
import {createStyles, makeStyles, Theme} from "@material-ui/core";
import CustomSelect from "components/CustomSelect/CustomSelect";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import {AddCircleOutline, EditOutlined} from "@material-ui/icons";
import {TestStepStore} from "views/Campaigns/store/TestStepStore";
import SegmentDialog from "views/Campaigns/components/test/SegmentDialog";

const extraStyles = makeStyles((theme: Theme) =>
  createStyles({
   container: {
    marginTop: theme.typography.pxToRem(20)
   },
   label: {
    width: theme.typography.pxToRem(200),
    marginRight: theme.typography.pxToRem(30)
   },
   iconButton: {
    padding: theme.typography.pxToRem(3)
   }
  }));

const TestStep = () => {

 const store = CampaignViewStore.testStepStore;
 if (!store) return null;

 const classes = useStyles();
 const extraClasses = extraStyles();
 const centerNote = classNames(classes.note, classes.center, classes.textToRight, extraClasses.label);

 return (
   <Card>
    <CardBody>
     <Grid container>
      <Grid container item direction="row">
       <Typography variant="subtitle2" className={centerNote}>
        {Dictionary.defValue(DictionaryService.keys.variants)}
       </Typography>
       <Grid item xs={12} sm={12} md={6}>
        <FormControl fullWidth>
         <CustomSelect
           value={store!.currentVariant}
           onChange={(e: number) => store.setCurrentVariant(e)}
           options={CampaignViewStore.contentStepStore!.variantOptions}
         />
        </FormControl>
       </Grid>
      </Grid>
     </Grid>
     <Grid container item direction="row" className={extraClasses.container}>
      <Typography variant="subtitle2" className={centerNote}>
       {Dictionary.defValue(DictionaryService.keys.sendTestTo)}
      </Typography>
      <Grid container item xs={12} sm={12} md={6}>
       <Grid item xs={12} sm={8} md={10}>
        <FormControl fullWidth>
         <CustomSelect
           value={store!.currentSegment.testSegmentId}
           onChange={(e: string) => store!.setCurrentTestSegmentById(e)}
           options={TestStepStore.options}
         />
        </FormControl>
       </Grid>
       <Grid container item xs={12} sm={4} md={2} justify="flex-end">
        <IconButton onClick={() => store.setOpen(true)} className={extraClasses.iconButton}>
         <EditOutlined color="primary" fontSize="large" />
        </IconButton>

        <IconButton onClick={store.createNewSegment} className={extraClasses.iconButton}>
         <AddCircleOutline color="primary" fontSize="large" />
        </IconButton>
       </Grid>
      </Grid>
     </Grid>
    </CardBody>
    <SegmentDialog store={store}/>
   </Card>
 );
};

export default observer(TestStep);
