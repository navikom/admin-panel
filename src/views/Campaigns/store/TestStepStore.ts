import {ITestStep} from "interfaces/ITestStep";
import {computed} from "mobx";

export class TestStepStore implements ITestStep {
 @computed get isValidStep(): boolean {
  return true;
 }

}
