import React, { useEffect } from "react";
import { when } from "mobx";
import { useDisposable, useObserver } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";

// @material-ui/icons
import { InfoOutlined, ExitToAppOutlined, SupervisedUserCircleOutlined, Clear } from "@material-ui/icons";

// models
import { App } from "models/App";
import { Users } from "models/User/UsersStore";

// interfaces
import { IUser } from "interfaces/IUser";

import { lazy } from "utils";
import { Dictionary, DictionaryService } from "services/Dictionary/Dictionary";
import { UserDetails } from "views/Users/components/UserDetailsStore";
import { AppDataStore } from "models/App/AppDataStore";
import Snackbar from "components/Snackbar/Snackbar";

// core components
const CustomTabs = lazy(() => import("components/CustomTabs/CustomTabs"));
const GridContainer = lazy(() => import("components/Grid/GridContainer"));
const GridItem = lazy(() => import("components/Grid/GridItem"));
const UserPersonalData = lazy(() => import("views/Users/components/UserPersonalData"));
const UserCredentials = lazy(() => import("views/Users/components/UserCredentials"));
const UserReferrals = lazy(() => import("views/Users/components/UserReferrals"));

type UserMatch = {
  userId: string;
}

export interface UserItemProps extends RouteComponentProps<UserMatch> {}

const UserItem = (props: UserItemProps) => {
  const userId = Number(props.match.params.userId);
  const user = Users.getOrCreate({userId} as IUser);
  UserDetails.bindUser(user);
  user.setFullDataLoaded(false);
  const dispose = useDisposable(() =>
    when(() => App.tokenIsReady, async () => {
      Users.loadFullData(user);
    })
  );

  useEffect(() => {
    return () => dispose();
  });

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <CustomTabs
          title={`${Dictionary.defValue(DictionaryService.keys.user)} #${userId}:`}
          headerColor="primary"
          tabs={[
            {
              tabName: Dictionary.defValue(DictionaryService.keys.personalData),
              tabIcon: InfoOutlined,
              tabContent: (<UserPersonalData />)
            },
            {
              tabName: Dictionary.defValue(DictionaryService.keys.credentials),
              tabIcon: ExitToAppOutlined,
              tabContent: (<UserCredentials />)
            },
            {
              tabName: Dictionary.defValue(DictionaryService.keys.referrals),
              tabIcon: SupervisedUserCircleOutlined,
              tabContent: (<UserReferrals />)
            }
          ]}
        />
      </GridItem>
      {
        useObserver(() => (
          <Snackbar
            place="br"
            color="danger"
            icon={Clear}
            message={Dictionary.defValue(DictionaryService.keys.dataSaveError, [UserDetails.user!.fullName || "", UserDetails.error || ""])}
            open={UserDetails.hasError}
            closeNotification={() => UserDetails.setError(null)}
            close
          />
        ))
      }
    </GridContainer>
  )
};

export default UserItem;
