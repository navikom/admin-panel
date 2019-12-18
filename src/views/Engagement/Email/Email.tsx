import React, { useState } from "react";
import { observer } from "mobx-react-lite";

// @material-ui/icons
import { AddCircleOutline, Public, List } from "@material-ui/icons";

// @material-ui/core
import { createStyles, makeStyles, Theme } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";

// core components
const GridContainer = lazy(() => import("components/Grid/GridContainer"));
const GridItem = lazy(() => import("components/Grid/GridItem"));
const Overview = lazy(() => import("views/Engagement/Email/Overview"));
const CustomTabs = lazy(() => import("components/CustomTabs/CustomTabs"));

// services
import { Dictionary, DictionaryService } from "services/Dictionary/Dictionary";

import useStyles from "assets/jss/material-dashboard-react/views/cardStyle";
import { lazy } from "utils";
import { whiteColor } from "assets/jss/material-dashboard-react";

import Table from "components/Table/TablePagination";
import RegularButton from "components/CustomButtons/Button";

const extendStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      alignItems: "center",
      textAlign: "center",
    },
    button: {
      color: whiteColor,
      opacity: .7,
      "&:hover": {
        opacity: .9
      }
    },
    buttonAdd: {
      marginTop: theme.typography.pxToRem(20)
    }
  }));

const EmailTitle = ({ ...props }) => {
  const classes = useStyles();
  const eClasses = extendStyles();
  return (
    <Grid container className={eClasses.root}>
      <IconButton className={eClasses.button} onClick={props.onClick}>
        <AddCircleOutline/>
      </IconButton>
      <h4 className={classes.cardTitleWhite}>
        {Dictionary.defValue(DictionaryService.keys.email)} {Dictionary.defValue(DictionaryService.keys.campaigns)}:
      </h4>
    </Grid>
  );
};

const CampaignTable = observer((props) => {
  const eClasses = extendStyles();
    return (
      <div className={eClasses.root}>
        <Table
          tableProps={{
            tableHeaderColor: "primary",
            tableHead: [
              Dictionary.defValue(DictionaryService.keys.name),
              Dictionary.defValue(DictionaryService.keys.type),
              Dictionary.defValue(DictionaryService.keys.status),
              Dictionary.defValue(DictionaryService.keys.startDate),
              Dictionary.defValue(DictionaryService.keys.delivered),
              Dictionary.defValue(DictionaryService.keys.uniqueOpens),
              Dictionary.defValue(DictionaryService.keys.uniqueClicks),
              Dictionary.defValue(DictionaryService.keys.uniqueConversions),
              Dictionary.defValue(DictionaryService.keys.revenue)
            ],
            tableData: []
          }}
          paginationProps={{
            rowsPerPageOptions: [5],
            count: 0,
            rowsPerPage: 5,
            page: 0,
            onChangePage: () => {
            },
            onChangeRowsPerPage: () => {
            }
          }}
          onRowClick={(data: string[]) => {
          }}
        />
        <RegularButton color="primary" className={eClasses.buttonAdd}>
          {Dictionary.defValue(DictionaryService.keys.add)} {Dictionary.defValue(DictionaryService.keys.campaign)}
        </RegularButton>
      </div>
    );
  }
);

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <CustomTabs
          title={<EmailTitle onClick={() => setOpen(true)}/>}
          noCardTitle
          headerColor="primary"
          currentIndex={1}
          tabs={[
            {
              tabName: Dictionary.defValue(DictionaryService.keys.overview),
              tabIcon: Public,
              tabContent: <Overview/>
            },
            {
              tabName: Dictionary.defValue(DictionaryService.keys.campaignList),
              tabIcon: List,
              tabContent: <CampaignTable/>
            }
          ]}
        />
      </GridItem>

    </GridContainer>
  );
}
