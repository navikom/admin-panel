import React, { Suspense, useEffect, useRef, useState } from "react";
import { observable } from "mobx";
import { useObserver } from "mobx-react-lite";

// @material-ui/core components
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
// utils
import { lazy } from "utils";

// services
import { Dictionary, DictionaryService } from "services/Dictionary/Dictionary";
import Table from "components/Table/Table";
import { RouteComponentProps } from "react-router";
import { Events } from "models/Event/EventsStore";

// core components
const Card = lazy(() => import("components/Card/Card.jsx"));
const CardHeader = lazy(() => import("components/Card/CardHeader.jsx"));
const CardBody = lazy(() => import("components/Card/CardBody.jsx"));

import style from 'assets/jss/material-dashboard-react/components/listStyle';
import { useIsomorphicLayoutEffect } from "utils/isomorphicEffect";
import { ScrollService } from "services/ScrollService";

interface UsersListProps extends RouteComponentProps, WithStyles<typeof style> {
}

const UsersList = (props: UsersListProps) => {

  const [events] = useState(() => observable(Events));

  useIsomorphicLayoutEffect(() => {
    Events.fetchItems();
    ScrollService.setStore(Events);
    return () => {
      console.log('UsersList will unmount');
      ScrollService.setStore();
    }
  });

  const {classes} = props;
  return (
    <Suspense fallback={"Loading"}>
      <Card>
        <CardHeader color="primary">
          <h4 className={classes.cardTitleWhite}>{Dictionary.defValue(DictionaryService.keys.users)}</h4>
          <p className={classes.cardCategoryWhite}>
            {Dictionary.defValue(DictionaryService.keys.usersDashboard)}
          </p>
        </CardHeader>
        <CardBody>
          <div className={classes.typo}>
            {
              useObserver(() => (
                <h1>Users list {events.size}</h1>
              ))
            }

          </div>
          {
            useObserver(() => (
              <Table
                tableHeaderColor="primary"
                tableHead={["Id", "Date", "Action", "Email", "Status", "Activity"]}
                tableData={events.tableData}
              />
            ))
          }
        </CardBody>
      </Card>
    </Suspense>
  )
};


export default withStyles(style)(UsersList);
