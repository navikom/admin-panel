import { action, observable } from "mobx";
import { ISegment, VisitorType } from "../../interfaces/ISegment";

export class SegmentStore implements ISegment {
  @observable name!: string;
  @observable segmentId!: number;
  @observable visitorType!: VisitorType;

  pk: string = "segmentId";

  @action update(model: ISegment) {
    Object.assign(this, model);
  }

  static from(model: ISegment) {
    const segment = new SegmentStore();
    segment.update(model);
    return segment;
  }
}
