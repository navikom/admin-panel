import React from "react";
// @material-ui/core components
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem";
import GridContainer from "components/Grid/GridContainer";
import Table from "components/Table/Table";
import Card from "components/Card/Card.tsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import { createStyles } from "@material-ui/core";
import { RouteComponentProps } from "react-router";
import { Dictionary, DictionaryService } from "services/Dictionary/Dictionary";

const styles = createStyles({
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
});
interface AppsProps extends RouteComponentProps, WithStyles<typeof styles> {
}
function AppList(props: AppsProps) {
  const { classes } = props;
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
            <Table
              tableHeaderColor="primary"
              tableHead={["Name", "Category", "Details"]}
              tableData={[
                ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
                ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
                ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
                ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
                ["Mason Porter", "Chile", "Gloucester", "$78,615"]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

export default withStyles(styles)(AppList);
