import { FormRow } from "components/Grid/FormRow";
import { Dictionary, DictionaryService } from "services/Dictionary/Dictionary";
import React from "react";
import GridContainer from "components/Grid/GridContainer";
import { IUsersRegions } from "interfaces/IUserRegion";

export const UserLocationCard = ({...props}) => {
  const location = props.location ? props.location : { region: {} } as IUsersRegions;
  return (
    <GridContainer spacing={1}>
      <GridContainer item xs={12} spacing={3}>
        <FormRow data={[
          [Dictionary.defValue(DictionaryService.keys.country), location.region.country],
          [Dictionary.defValue(DictionaryService.keys.state), location.region.region],
          [Dictionary.defValue(DictionaryService.keys.city), location.region.city]
        ]}/>
      </GridContainer>
      <GridContainer item xs={12} spacing={3}>
        <FormRow data={[
          [Dictionary.defValue(DictionaryService.keys.locality), ""],
          [Dictionary.defValue(DictionaryService.keys.timezone), location.region.timezone], ["", ""]
        ]}/>
      </GridContainer>
    </GridContainer>
  )
};
