import { action, computed, observable } from "mobx";
import { ISegmentAttributeView } from "interfaces/ISegmentAttributeView";

import { AND, OR, UserAttributeNames } from "models/Constants";
import { AndType, ExpressionValueType, OrType, ValueType } from "types/expressions";

export class SegmentAttributeViewStore implements ISegmentAttributeView {
  static attributeNames: Map<string, Map<string, ExpressionValueType | undefined> | undefined> =
    UserAttributeNames;
  @observable static readonly list = observable<SegmentAttributeViewStore>([]);
  @observable static readonly andOr = observable<AndType | OrType>([]);

  @observable currentAttributeName?: string;
  @observable currentExpression?: string;
  @observable expressions?: string[];
  @observable value?: string | number | boolean;
  @observable date?: Date;
  @observable from?: Date;
  @observable to?: Date;
  @observable min?: number;
  @observable max?: number;
  @observable values?: (string | number)[];
  @observable keys?: ValueType[];

  @action setAttributeName(name: string) {
    this.clear();
    if(SegmentAttributeViewStore.attributeNames.has(name)) {
      this.currentAttributeName = name;
      const attributeMap = SegmentAttributeViewStore.attributeNames.get(name);
      if(attributeMap) {
        this.expressions = Array.from(attributeMap.keys());
        this.setExpression(this.expressions![0]);
      } else {
        this.currentExpression = undefined;
      }
    }
  }

  @action initExpression(expression: ExpressionValueType | undefined) {
    if(!expression) {
      this.clearValueData();
      return;
    }
    if(expression.key) {
      // @ts-ignore
      this[expression.key] = expression.defaultValue !== undefined
        ? expression.defaultValue : expression.defaultValues;
      this.keys = [expression.key];
    } else if(expression.keys) {
      // @ts-ignore
      this[expression.keys[0]] = expression.defaultValues![0];
      // @ts-ignore
      this[expression.keys[1]] = expression.defaultValues![1];
      this.keys = expression.keys;
    }
  }

  @action setExpression(expressionName: string) {
    if(!this.currentAttributeName) return;
    this.currentExpression = expressionName;

    if(SegmentAttributeViewStore.attributeNames.get(this.currentAttributeName)!.has(expressionName)) {
      const expression = SegmentAttributeViewStore.attributeNames.get(this.currentAttributeName)!.get(expressionName);
      this.initExpression(expression);
    }
  }

  @action setValue(value: string & Date & number & (string | number)[], key: ValueType) {
    this[key] = value;
  }

  @action clear() {
    this.currentAttributeName = undefined;
    this.currentExpression = undefined;
    this.expressions = undefined;
    this.clearValueData();
  }

  @action clearValueData() {
    this.values = undefined;
    this.value = undefined;
    this.keys = undefined;
    this.min = undefined;
    this.max = undefined;
    this.from = undefined;
    this.to = undefined;
    this.date = undefined;
  }

  //######## static ###########//

  static get attributeNamesKeys() {
    return this.attributeNames.keys();
  }

  static isAnd(index: number) {
    return computed(() => this.andOr.length > index && this.andOr[index] === AND).get();
  }

  @action static addNewItem() {
    this.list.push(new SegmentAttributeViewStore());
    this.andOr.push(AND);
  }

  @action static removeItem(index: number) {
    this.list.splice(index, 1);
    this.andOr.splice(index, 1);
  }

  @action static handleAndOr(index: number) {
    this.andOr[index] = this.andOr[index] === AND ? OR : AND;
  }

  @action static clear() {
    this.list.replace([
      new SegmentAttributeViewStore()
    ]);
    this.andOr.replace([]);
  }
}
