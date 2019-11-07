import {Deserializable} from "./deserializable.model";

export class Qualification implements Deserializable {
  public id: number;
  public name: string;
  public description: string;
  public colour: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }
}
