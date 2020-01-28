import {ContentDeviceViewStore} from "views/Campaigns/store/ContentDeviceViewStore";
import {IInAppVariant} from "interfaces/IVariant";
import {InAppVariantStore} from "models/Campaign/InApp/InAppVariantStore";

export class ContentInAppViewStore  extends ContentDeviceViewStore {

 constructor(variant: IInAppVariant = new InAppVariantStore()) {
  super(variant);
 }

}
