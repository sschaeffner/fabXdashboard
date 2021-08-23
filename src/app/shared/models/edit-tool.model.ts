import {ToolType} from "./ToolType.model";
import {ToolState} from "./ToolState.model";
import {IdleState} from "./IdleState.model";

export class EditTool {
  public deviceId: number;
  public name: string;
  public pin: number;
  public toolType: ToolType;
  public time: number;
  public idleState: IdleState;
  public toolState: ToolState;
  public wikiLink: string;
  public qualifications: number[];
}
