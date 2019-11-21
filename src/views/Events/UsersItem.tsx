import React, { useState } from "react";

// @material-ui/core components
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import {
  ReorderOutlined,
  SubtitlesOutlined,
  Devices,
  InfoOutlined
} from "@material-ui/icons";
// utils
import { lazy } from "utils";

// services
import { Dictionary, DictionaryService } from "services/Dictionary/Dictionary";
import { RouteComponentProps } from "react-router";

// core components
const CustomTabs = lazy(() => import("components/CustomTabs/CustomTabs"));
const GridContainer = lazy(() => import("components/Grid/GridContainer"));
const GridItem = lazy(() => import("components/Grid/GridItem"));

import Card from "components/Card/Card.tsx";
import CardHeader from "components/Card/CardHeader";

import style from "assets/jss/material-dashboard-react/views/dashboardStyle";
import CardBody from "components/Card/CardBody";
import { IUser } from "interfaces/IUser";
import { useDisposable } from "mobx-react-lite";
import { when } from "mobx";
import { App } from "models/App";
import { Users } from "models/User/UsersStore";
import { IUsersRegions } from "interfaces/IUserRegion";

interface MatchInfo {
  userId: string;
}

interface UsersItemProps extends RouteComponentProps<MatchInfo>, WithStyles<typeof style> {
}

const FormRow = ({ ...props }) => {
  return (
    <React.Fragment>
      {
        props.data.map((entry: string[], key: number) => (
          <GridItem xs={4} key={key}>
            <div>{entry[0].length ? entry[0].toUpperCase() + ":" : ""} <b>{entry[1]}</b></div>
          </GridItem>
        ))
      }
    </React.Fragment>
  );
};

const UsersItem = (props: UsersItemProps) => {
  const userId = Number(props.match.params.userId);
  const [user, setUser] = useState({ userId } as IUser);
  useDisposable(() =>
    when(() => App.tokenIsReady, () => {
      const u = Users.getByIdFullData(userId);
      when(() => u.fullDataLoaded, () => {
        setUser(u);
      });
    }));
  const location = user.location ? user.location : {region: {}} as IUsersRegions;
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <CustomTabs
          title={`${Dictionary.defValue(DictionaryService.keys.userEvents)}:`}
          headerColor="primary"
          tabs={[
            {
              tabName: Dictionary.defValue(DictionaryService.keys.basicInfo),
              tabIcon: InfoOutlined,
              tabContent: (
                <div>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Card>
                        <CardHeader>
                          {Dictionary.defValue(DictionaryService.keys.contact)}
                        </CardHeader>
                        <CardBody>
                          <GridContainer spacing={1}>
                            <GridContainer item xs={12} spacing={3}>
                              <FormRow data={[
                                [Dictionary.defValue(DictionaryService.keys.name), user.firstName],
                                [Dictionary.defValue(DictionaryService.keys.email), user.email],
                                [Dictionary.defValue(DictionaryService.keys.phone), user.phone]
                              ]}/>
                            </GridContainer>
                          </GridContainer>
                        </CardBody>
                      </Card>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Card>
                        <CardHeader>
                          {Dictionary.defValue(DictionaryService.keys.location)}
                        </CardHeader>
                        <CardBody>
                          <GridContainer spacing={1}>
                            <GridContainer item xs={12} spacing={3}>
                              <FormRow data={[
                                [Dictionary.defValue(DictionaryService.keys.country), location.region.country],
                                [Dictionary.defValue(DictionaryService.keys.state), location.region.region],
                                [Dictionary.defValue(DictionaryService.keys.city), location.region.city]
                              ]}/>
                            </GridContainer>
                            <GridContainer item xs={12} spacing={3}>
                              <FormRow data={[
                                [Dictionary.defValue(DictionaryService.keys.locality), ""],
                                [Dictionary.defValue(DictionaryService.keys.timezone), location.region.timezone], ["", ""]
                              ]}/>
                            </GridContainer>
                          </GridContainer>
                        </CardBody>
                      </Card>
                    </GridItem>
                  </GridContainer>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={12}>
                      <Card>
                        <CardHeader>
                          {Dictionary.defValue(DictionaryService.keys.location)}
                        </CardHeader>
                        <CardBody>
                          <GridContainer spacing={1}>
                            <GridContainer item xs={12} spacing={3}>
                              <FormRow data={[
                                [Dictionary.defValue(DictionaryService.keys.firstSeen), Dictionary.timeDateString(user.createdAt)],
                                [Dictionary.defValue(DictionaryService.keys.lastSeen), Dictionary.timeDateString(user.lastEvent)],
                                [Dictionary.defValue(DictionaryService.keys.identified), Dictionary.timeDateString(user.createdAt)]
                              ]}/>
                            </GridContainer>
                            <GridContainer item xs={12} spacing={3}>
                              <FormRow data={[
                                [Dictionary.defValue(DictionaryService.keys.totalEvents), user.eventsCount],
                                [Dictionary.defValue(DictionaryService.keys.totalTime), user.totalTime], ["", ""]
                              ]}/>
                            </GridContainer>
                          </GridContainer>
                        </CardBody>
                      </Card>
                    </GridItem>
                  </GridContainer>
                </div>
              )
            },
            {
              tabName: Dictionary.defValue(DictionaryService.keys.devices),
              tabIcon: Devices,
              tabContent: (
                <div>Hello</div>
              )
            },
            {
              tabName: Dictionary.defValue(DictionaryService.keys.events),
              tabIcon: SubtitlesOutlined,
              tabContent: (
                <div>Hello</div>
              )
            }
          ]}
        />
      </GridItem>
    </GridContainer>
  );
};


export default withStyles(style)(UsersItem);
