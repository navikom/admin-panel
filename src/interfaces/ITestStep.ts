import {IStep} from "interfaces/IStep";
import {IUser} from "interfaces/IUser";

export type TestSegmentPropertyType = "userId" | "email" | "phone";

export interface ITestSegment {
 testSegmentId: number;
 propertyName: TestSegmentPropertyType;
 propertyValues: (string | number)[];
 users?: IUser[];
 name: string;

 update(model: ITestSegment): void;
}

export interface ITestStep extends IStep {
 currentVariant: number;
 currentSegment: ITestSegment;
 open: boolean;

 setCurrentVariant(variant: number): void;
 setCurrentTestSegment(testSegment: ITestSegment): void;
 setCurrentTestSegmentById(id: string): void;
 setOpen(value: boolean): void;
 createNewSegment(): void;
 save(): void;
}
