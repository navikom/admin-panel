import React from "react";
import { observer } from "mobx-react-lite";

// services
import { Dictionary, DictionaryService } from "services/Dictionary/Dictionary";

import SegmentViewStore from "views/Segments/SegmentViewStore";
import FiltarableComponent from "views/Segments/components/FiltarableComponent";

export default observer(() => {
  if (!SegmentViewStore.segment) return null;

  const first = {
    value: SegmentViewStore.lastSeenValue,
    options: ["", ...SegmentViewStore.lastSeenExpressions],
    onChange: (e: string) => SegmentViewStore.updateLastSeenExpression(e),
    label: Dictionary.defValue(DictionaryService.keys.is)
  };

  const second = {
    ...SegmentViewStore.lastSeenValues,
    onChange: (e: Date, key: "from" | "to") => SegmentViewStore.updateLastSeenValue(e, key)
  };

  return (
    <FiltarableComponent
      first={first}
      second={second}
      third={{}}
    />
  );
});
