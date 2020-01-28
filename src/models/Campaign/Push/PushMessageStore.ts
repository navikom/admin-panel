import {action, observable} from "mobx";
import {IPushMessage} from "interfaces/IVariant";

export class PushMessageStore implements IPushMessage {
 @observable keyValue: string[][] | null = null;
 @observable message: string = "";
 @observable title: string = "";

 @action update(model: IPushMessage): void {
  Object.assign(this, model);
 }

}
