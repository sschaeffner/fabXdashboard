import {Qualification} from "./qualification.model";
import {Deserializable} from "./deserializable.model";

export class User implements Deserializable {
  public id: number;
  public firstName: string;
  public lastName: string;
  public wikiName: string;
  public phoneNumber: string;
  public locked: boolean;
  public lockedReason: string;
  public cardId: string;
  public cardSecret: string;
  public qualifications: Qualification[];

  deserialize(input: any): this {
    Object.assign(this, input);
    this.qualifications = input.qualifications.map(qualification => new Qualification().deserialize(qualification));
    this.qualifications.sort((q1, q2) => q1.orderNr - q2.orderNr);
    return this;
  }
}
