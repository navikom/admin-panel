import React from "react";
import { observer } from "mobx-react-lite";

// services
import { Dictionary, DictionaryService } from "services/Dictionary/Dictionary";

import { NumberTypes } from "types/expressions";
import SegmentViewStore from "views/Segments/SegmentViewStore";
import FiltarableComponent from "views/Segments/components/FiltarableComponent";

type SecondSelectOptionsType = { value?: NumberTypes, options?: NumberTypes[], onChange?: (e: string) => void };
type ThirdSelectOptionsType = {
  values?: number[], value?: number | boolean, min?: number, max?: number
  onChange?: (e: string, key: "values" | "value" | "min" | "max") => void
};

export default observer(() => {
  if (!SegmentViewStore.segment) return null;
  const userTab = SegmentViewStore.segment.userTab;

  const first = {
    value: userTab!.visitorType.name,
    options: Array.from(SegmentViewStore.visitorTypes.keys()),
    onChange: (e: string) => userTab!.updateVisitor(e),
    label: Dictionary.defValue(DictionaryService.keys.is)
  };

  const second: SecondSelectOptionsType = {};
  if (userTab!.visitorType.is) {
    second.value = userTab!.visitorType.is;
    second.options = SegmentViewStore.visitorTypes.get(userTab!.visitorType.name);
    second.onChange = (e: string) => userTab!.updateVisitorCondition(e as NumberTypes);
  }

  const third: ThirdSelectOptionsType = {
    ...SegmentViewStore.visitorTypeValues,
    onChange: (e: string | string[], key: "values" | "value" | "min" | "max") => SegmentViewStore.updateVisitorValue(e, key)
  };

  return (
    <FiltarableComponent
      first={first}
      second={second}
      third={third}
    />
  );
});
