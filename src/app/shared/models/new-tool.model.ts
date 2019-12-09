import {ToolType} from "./ToolType.model";
import {ToolState} from "./ToolState.model";

export class NewTool {
  public deviceId: number;
  public name: string;
  public pin: number;
  public toolType: ToolType;
  public toolState: ToolState;
  public wikiLink: string;
  public qualifications: number[];
}
