import React from "react";
import { RouteComponentProps } from "react-router";

// utils
import { lazy } from "utils";

// core components
import GridContainer from "components/Grid/GridContainer";
import { useDisposable } from "mobx-react-lite";
import { when } from "mobx";
import { App } from "models/App";
import CampaignViewStore from "views/Campaigns/CampaignViewStore";

const StepperComponent = lazy(() => import("views/Campaigns/components/StepperComponent"));

type CampaignMatch = {
  campaignId: string;
}

export default (props: RouteComponentProps<CampaignMatch>) => {
  const id = Number(props.match.params.campaignId);

  console.log("Campaign Item %d", id);

  if(!CampaignViewStore.campaign) {
    const url = props.match.url.split("/");
    url.pop();
    setTimeout(() => props.history.push(url.join("/")), 0);
  }

  useDisposable(() =>
    when(() => App.tokenIsReady, () => {

    })
  );

  return (
    <GridContainer>
      <StepperComponent/>
    </GridContainer>
  )
};
