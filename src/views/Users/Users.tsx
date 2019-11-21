import React, { Suspense } from "react";
import { RouteComponentProps } from "react-router";
import { observer } from "mobx-react";
// @material-ui/core components
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
// utils
import { lazy } from "utils";

// services
import { Dictionary, DictionaryService } from "services/Dictionary/Dictionary";
import Table from "components/Table/Table";

// core components
const Card = lazy(() => import("components/Card/Card.tsx"));
const CardHeader = lazy(() => import("components/Card/CardHeader.jsx"));
const CardBody = lazy(() => import("components/Card/CardBody.jsx"));

import style from 'assets/jss/material-dashboard-react/components/listStyle';
import { Users } from "models/User/UsersStore";


interface UsersListProps extends RouteComponentProps, WithStyles<typeof style> {
}

@observer
class VUsers extends React.Component<UsersListProps> {

  componentDidMount(): void {
    Users.fetchItems();
  }

  get items() {
    return Users.items.map(u => [u.userId, u.fullName, u.email, u.eventsCount])
  }

  render() {
    const {classes} = this.props;
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
              <h1>Users list</h1>
            </div>
            <Table
              tableHeaderColor="primary"
              tableHead={["Id", "Name", "Email", "Activity"]}
              tableData={this.items}
            />
          </CardBody>
        </Card>
      </Suspense>
    );
  }

}
export default withStyles(style)(VUsers);
