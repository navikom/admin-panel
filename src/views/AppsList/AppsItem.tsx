import React from "react";
import { when } from "mobx";
import { observer, useDisposable } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";

// @material-ui/icons
import { InfoOutlined, People } from "@material-ui/icons";
import AddAlert from "@material-ui/icons/AddAlert";

// services
import { Dictionary, DictionaryService } from "services/Dictionary/Dictionary";

// interfaces
import { IApp } from "interfaces/IApp";

// utils
import { lazy } from "utils";

// models
import { App } from "models/App";
import { Apps } from "models/App/AppsStore";
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Snackbar from "components/Snackbar/Snackbar";

// core components
const CustomTabs = lazy(() => import("components/CustomTabs/CustomTabs"));
const AppData = lazy(() => import("views/AppsList/components/AppData"));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.typography.pxToRem(20)
    }
  })
);

const Tabs = observer((props: { app: IApp }) => {
  const app = props.app;
  const classes = useStyles();
  return (
    <div>
      <CustomTabs
        title={`${Dictionary.defValue(DictionaryService.keys.appDetails, app.title)}:`}
        headerColor="primary"
        tabs={[
          {
            tabName: Dictionary.defValue(DictionaryService.keys.basicInfo),
            tabIcon: InfoOutlined,
            tabContent: (<div className={classes.root}><AppData app={app}/></div>)
          },
          {
            tabName: Dictionary.defValue(DictionaryService.keys.users),
            tabIcon: People,
            tabContent: (<div className={classes.root}></div>)
          }
        ]}
      />
        <Snackbar
          place="br"
          color="info"
          icon={AddAlert}
          message="App data saved successfully"
          open={Apps.appSaved}
          closeNotification={() => Apps.setAppSaved(false)}
          close
        />
    </div>
  );
});

interface MatchInfo {
  appId: string;
}

interface AppsItemProps extends RouteComponentProps<MatchInfo> {
}

export const AppsItem = (props: AppsItemProps) => {
  const appId = Number(props.match.params.appId);
  const app = Apps.getOrCreate({ appId } as IApp) as IApp;
  useDisposable(() =>
    when(() => App.tokenIsReady, async () => {
      await Apps.loadFullData(app);
    }));
  return <Tabs app={app}/>;
};

export default AppsItem;
