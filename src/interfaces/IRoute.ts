import * as React from "react";
import { SvgIconProps } from "@material-ui/core/SvgIcon";
import Login from "views/Login/Login";

export interface IRoute {
  path: string;
  name: string;
  rtlName: string;
  icon?: React.ComponentType<SvgIconProps>;
  component: React.ComponentType<any>,
  layout: string;
  auth?: boolean;
}
