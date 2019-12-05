import {Deserializable} from "./deserializable.model";
import {Tool} from "./tool.model";

export class Device implements Deserializable {
  public id: number;
  public name: string;
  public mac: string;
  public secret: string;
  public bgImageUrl: string;
  public backupBackendUrl: string;
  public tools: Tool[];

  deserialize(input: any): this {
    Object.assign(this, input);
    this.tools = input.tools.map(tool => new Tool().deserialize(tool));
    return this;
  }
}
