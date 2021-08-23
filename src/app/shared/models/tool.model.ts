import {Deserializable} from "./deserializable.model";
import {Qualification} from "./qualification.model";
import {ToolType} from "./ToolType.model";
import {ToolState} from "./ToolState.model";
import {IdleState} from "./IdleState.model";

export class Tool implements Deserializable {
  public id: number;
  public deviceId: string;
  public name: string;
  public pin: number;
  public toolType: ToolType;
  public time: number;
  public idleState: IdleState;
  public toolState: ToolState;
  public wikiLink: string;
  public qualifications: Qualification[];

  deserialize(input: any): this {
    Object.assign(this, input);
    this.qualifications = input.qualifications.map(qualification => new Qualification().deserialize(qualification));
    this.qualifications.sort((q1, q2) => q1.orderNr - q2.orderNr);
    return this;
  }
}
