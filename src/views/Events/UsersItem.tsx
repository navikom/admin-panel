import React, { useState } from "react";

// @material-ui/core components
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import {
  Apps,
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

import style from "assets/jss/material-dashboard-react/views/dashboardStyle";
import { IUser } from "interfaces/IUser";
import { useDisposable } from "mobx-react-lite";
import { when } from "mobx";
import { App } from "models/App";
import { Users } from "models/User/UsersStore";
import { UserInfoTab } from "views/Events/UserInfoTab";
import { UserDevicesTab } from "views/Events/UserDevicesTab";
import { UserEventsTab } from "views/Events/UserEventsTab";
import { UserAppsTab } from "views/Events/UserAppsTab";

interface MatchInfo {
  userId: string;
}

interface UsersItemProps extends RouteComponentProps<MatchInfo>, WithStyles<typeof style> {
}

const UsersItem = (props: UsersItemProps) => {
  const userId = Number(props.match.params.userId);
  const [user, setUser] = useState({ userId } as IUser);
  useDisposable(() =>
    when(() => App.tokenIsReady, () => {
      const u = Users.getByIdFullData(userId);
      u.events!.fetchItems();
      when(() => u.fullDataLoaded, () => {
        setUser(u);
      });
    }));

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
              tabContent: (<UserInfoTab user={user}/>)
            },
            {
              tabName: Dictionary.defValue(DictionaryService.keys.devices),
              tabIcon: Devices,
              tabContent: (<UserDevicesTab devices={user.devices}/>)
            },
            {
              tabName: Dictionary.defValue(DictionaryService.keys.apps),
              tabIcon: Apps,
              tabContent: (<UserAppsTab apps={user.apps}/>)
            },
            {
              tabName: Dictionary.defValue(DictionaryService.keys.events),
              tabIcon: SubtitlesOutlined,
              tabContent: (<UserEventsTab events={user.eventsItems}/>)
            }
          ]}
        />
      </GridItem>
    </GridContainer>
  );
};


export default withStyles(style)(UsersItem);
