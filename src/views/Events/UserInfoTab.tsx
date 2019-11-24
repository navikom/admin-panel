import { Dictionary, DictionaryService } from "services/Dictionary/Dictionary";
import { UserContactCard } from "views/Events/UserContactCard";
import { UserLocationCard } from "views/Events/UserLocationCard";
import { UserEventsCard } from "views/Events/UserEventsCard";
import React from "react";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import CardBody from "components/Card/CardBody";
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";

const InfoTabCard = ({ ...props }) => (
  <GridContainer>
    <GridItem xs={12} sm={12} md={12}>
      <Card>
        <CardHeader>
          {props.header}
        </CardHeader>
        <CardBody>
          {props.body}
        </CardBody>
      </Card>
    </GridItem>
  </GridContainer>
);

export const UserInfoTab = ({...props}) => (
  <div>
    <InfoTabCard
      header={Dictionary.defValue(DictionaryService.keys.contact)}
      body={<UserContactCard user={props.user}/>}
    />
    <InfoTabCard
      header={Dictionary.defValue(DictionaryService.keys.location)}
      body={<UserLocationCard location={props.user!.location} />}
    />
    <InfoTabCard
      header={Dictionary.defValue(DictionaryService.keys.location)}
      body={<UserEventsCard user={props.user} />}
    />
  </div>
)
