import {action, observable} from "mobx";
import {IInAppMessage} from "interfaces/IVariant";

export class InAppMessageStore implements IInAppMessage {
 @observable keyValue: string[][] | null = null;
 @observable message: string = "";
 @observable title: string = "";

 @action update(model: IInAppMessage): void {
  Object.assign(this, model);
 }

}
