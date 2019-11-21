import React, { useState } from "react";
// nodejs library that concatenates classes
import classNames from "classnames";

// material-ui components
import withStyles, { WithStyles } from "@material-ui/core/styles/withStyles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
// core components
import Card from "components/Card/Card.tsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";

import customTabsStyle from "assets/jss/material-dashboard-react/components/customTabsStyle";

interface CustomTabsProps extends WithStyles<typeof customTabsStyle> {
  headerColor: string;
  plainTabs?: boolean;
  tabs: any;
  title: string;
  rtlActive?: boolean;
}

const CustomTabs = ({ ...props }: CustomTabsProps) => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, value: number) => {
    setValue(value);
  };
  const {
    classes,
    headerColor,
    plainTabs,
    tabs,
    title,
    rtlActive
  } = props;
  const cardTitle = classNames({
    [classes.cardTitle]: true,
    [classes.cardTitleRTL]: rtlActive
  });
  return (
    <Card plain={plainTabs}>
      <CardHeader color={headerColor} plain={plainTabs}>
        {title !== undefined ? (
          <div className={cardTitle}>{title}</div>
        ) : null}
        <Tabs
          value={value}
          onChange={handleChange}
          classes={{
            root: classes.tabsRoot,
            indicator: classes.displayNone,
            scrollButtons: classes.displayNone
          }}
          variant="scrollable"
          scrollButtons="auto"
        >
          {tabs.map((prop: any, key: number) => {
            let icon = {};
            if (prop.tabIcon) {
              icon = {
                icon: <prop.tabIcon/>
              };
            }
            return (
              <Tab
                classes={{
                  root: classes.tabRootButton,
                  // labelContainer: classes.tabLabelContainer,
                  // label: classes.tabLabel,
                  selected: classes.tabSelected,
                  wrapper: classes.tabWrapper
                }}
                key={key}
                label={prop.tabName}
                {...icon}
              />
            );
          })}
        </Tabs>
      </CardHeader>
      <CardBody>
        {tabs.map((prop: any, key: number) => {
          if (key === value) {
            return <div key={key}>{prop.tabContent}</div>;
          }
          return null;
        })}
      </CardBody>
    </Card>
  );
};

export default withStyles(customTabsStyle)(CustomTabs);