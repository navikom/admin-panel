import { Pagination } from "models/Pagination";
import { ISegment } from "interfaces/ISegment";
import { action, observable } from "mobx";

class SegmentsStore extends Pagination<ISegment> {
  @observable expressions!: string[];

  constructor() {
    super("segmentId", "segment", 20, "pagination", [5, 10, 25, 50]);
  }

  @action setExpressions(list: string[]) {
    if(!this.expressions) {
      this.expressions = list;
    }
  }
}

export const Segments = new SegmentsStore();
