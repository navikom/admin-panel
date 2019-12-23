import React from "react";
import { RouteComponentProps } from "react-router";

type CampaignMatch = {
  campaignId: string;
}

export default (props: RouteComponentProps<CampaignMatch>) => {
  return (
    <div>hello</div>
  )
};
