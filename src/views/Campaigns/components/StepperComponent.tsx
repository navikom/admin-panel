import React from "react";
import { observer } from "mobx-react-lite";

// @material-ui/icons
import { Clear } from "@material-ui/icons";
import AddAlert from "@material-ui/icons/AddAlert";

// @material-ui/core
import { createStyles, makeStyles, Stepper, Theme } from "@material-ui/core";
import Step from "@material-ui/core/Step";
import StepButton from "@material-ui/core/StepButton";

// core components
import GridItem from "components/Grid/GridItem";
import Snackbar from "components/Snackbar/Snackbar";

// view store
import store from "views/Campaigns/CampaignViewStore";

// services
import { Dictionary, DictionaryService } from "services/Dictionary/Dictionary";

// utils
import { lazy } from "utils";
import StepLabel from "@material-ui/core/StepLabel";
import StepContent from "@material-ui/core/StepContent";
import WaitingComponent from "hocs/WaitingComponent";

const Audience = lazy(() => import("views/Campaigns/components/Audience"));

const stepsContent = [Audience];

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    verticalStepper: {
      backgroundColor: "#eeeeee"
    }
  }));

const HorizontalSteps = () => {
  return (
    <div>
      <Stepper alternativeLabel nonLinear activeStep={store.activeStep}>
        {store.steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const buttonProps: { optional?: React.ReactNode } = {};
          return (
            <Step key={label} {...stepProps}>
              <StepButton
                disabled={true}
                onClick={store.handleStep(index)}
                completed={false}
                {...buttonProps}
              >
                {Dictionary.value(label)}
              </StepButton>
            </Step>
          );
        })}
      </Stepper>
      {React.createElement(WaitingComponent(stepsContent[store.activeStep]))}
    </div>
  );
};

const VerticalSteps = () => {
  const classes = useStyles();
  return (
    <Stepper activeStep={store.activeStep} orientation="vertical" className={classes.verticalStepper}>
      {store.steps.map((label, index) => (
        <Step key={label}>
          <StepLabel>{Dictionary.value(label)}</StepLabel>
          <StepContent>
            {React.createElement(WaitingComponent(stepsContent[index]))}
          </StepContent>
        </Step>
      ))}
    </Stepper>
  );
};

export default observer(() => {
  if (!store.campaign) return null;
  const width = window.innerWidth;
  return (
    <GridItem xs={12} sm={12} md={12}>
      {width < 700 ? <VerticalSteps/> : <HorizontalSteps/>}
      <Snackbar
        place="br"
        color="info"
        icon={AddAlert}
        message={Dictionary.defValue(DictionaryService.keys.dataSavedSuccessfully, store.campaign!.name)}
        open={store.successRequest}
        closeNotification={() => store.setSuccessRequest(false)}
        close
      />
      <Snackbar
        place="br"
        color="danger"
        icon={Clear}
        message={Dictionary.defValue(DictionaryService.keys.dataSaveError, [store.campaign!.name || "", store.error || ""])}
        open={store.hasError}
        closeNotification={() => store.setError(null)}
        close
      />
    </GridItem>
  );
});
