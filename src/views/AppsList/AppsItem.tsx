import React, { useEffect } from "react";
import { when } from "mobx";
import { observer, useDisposable } from "mobx-react-lite";
import { RouteComponentProps } from "react-router";

// @material-ui/icons
import { InfoOutlined, People, Clear } from "@material-ui/icons";
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
import { AppDataStore } from "views/AppsList/components/AppData/AppDataStore";
import WaitingComponent from "hocs/WaitingComponent";

// core components
const CustomTabs = lazy(() => import("components/CustomTabs/CustomTabs"));
const AppData = lazy(() => import("views/AppsList/components/AppData/AppData"));

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.typography.pxToRem(20)
    }
  })
);

const Tabs = observer((props: { app: IApp }) => {
  AppDataStore.bindApp(props.app);
  const classes = useStyles();

  useEffect(() => {
    return () => {
      console.log('clear app');
      AppDataStore.bindApp(null);
    }
  }, []);

  const tabs = [{
      tabName: Dictionary.defValue(DictionaryService.keys.basicInfo),
      tabIcon: InfoOutlined,
      tabContent: (<div className={classes.root}><AppData/></div>)
    },
    ...(AppDataStore.tabs || []).map(e => ({...e, tabContent: WaitingComponent(e.tabContent)}))
  ];

  return (
    <div>
      <CustomTabs
        title={`${Dictionary.defValue(DictionaryService.keys.appDetails, AppDataStore.app!.title)}:`}
        headerColor="primary"
        tabs={tabs}
      />
        <Snackbar
          place="br"
          color="info"
          icon={AddAlert}
          message={Dictionary.defValue(DictionaryService.keys.dataSavedSuccessfully, AppDataStore.app!.title)}
          open={AppDataStore.appSaved}
          closeNotification={() => AppDataStore.setAppSaved(false)}
          close
        />
      <Snackbar
        place="br"
        color="danger"
        icon={Clear}
        message={Dictionary.defValue(DictionaryService.keys.dataSaveError, [AppDataStore.app!.title || "", AppDataStore.error || ""])}
        open={AppDataStore.hasError}
        closeNotification={() => AppDataStore.setError(null)}
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
