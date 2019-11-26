import React from "react";
import { when } from "mobx";
import { observer, useDisposable } from "mobx-react-lite";

import { RouteComponentProps } from "react-router";
// @material-ui/core components
import { createStyles, makeStyles, Theme } from "@material-ui/core";

// models
import { APPS_LIST_ROUTE } from "models/Constants";
import { Apps } from "models/App/AppsStore";
import { App } from "models/App";

// services
import { Dictionary, DictionaryService } from "services/Dictionary/Dictionary";

// core components
import { lazy } from "utils";

const Table = lazy(() => import("components/Table/TablePagination"));
const GridContainer = lazy(() => import("components/Grid/GridContainer"));
const GridItem = lazy(() => import("components/Grid/GridItem"));
const Card = lazy(() => import("components/Card/Card"));
const CardHeader = lazy(() => import("components/Card/CardHeader"));
const CardBody = lazy(() => import("components/Card/CardBody"));

const AppTable = observer((props: {handleClick(id: string): void}) => {
  return (
  <Table
    tableProps={{
      tableHeaderColor: "primary",
      tableHead: [
        Dictionary.defValue(DictionaryService.keys.id),
        Dictionary.defValue(DictionaryService.keys.title),
        Dictionary.defValue(DictionaryService.keys.createdAt),
        Dictionary.defValue(DictionaryService.keys.description)],
      tableData: Apps.appTableData
    }}
    paginationProps={{
      rowsPerPageOptions: Apps.rowsPerPageOptions,
      count: Apps.count,
      rowsPerPage: Apps.viewRowsPerPage,
      page: Apps.viewPage,
      onChangePage: Apps.handleChangePageInView,
      onChangeRowsPerPage: Apps.handleChangeRowsPerPage
    }}
    onRowClick={(data: string[]) => props.handleClick(data[0])}
  />
)});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: 300,
    fontFamily: "'Josefin Sans', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",

  },
  "small": {
    color: "#777",
    fontSize: "65%",
    fontWeight: 400,
    lineHeight: "1"
  }
}));
interface AppsProps extends RouteComponentProps {}

function AppList(props: AppsProps) {
  const classes  = useStyles();

  useDisposable(() =>
    when(() => App.tokenIsReady, () => Apps.fetchItems()));

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>{Dictionary.defValue(DictionaryService.keys.applicationsList)}</h4>
            <p className={classes.cardCategoryWhite}>
              {Dictionary.defValue(DictionaryService.keys.availableApplications)}
            </p>
          </CardHeader>
          <CardBody>
            <AppTable
              handleClick={(appId: string) => props.history.push(APPS_LIST_ROUTE + "/" + appId)}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

export default AppList;
