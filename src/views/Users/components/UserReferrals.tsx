import React from "react";
import { observer } from "mobx-react-lite";
import { IUser } from "interfaces/IUser";

export default observer((props: {user: IUser}) => {
  const {user} = props;
  return (
    <div></div>
  )
});
