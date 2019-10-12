import {Deserializable} from "./deserializable.model";

export class Info implements Deserializable {
  public adminName: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
