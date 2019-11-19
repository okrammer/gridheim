import { ModeService } from "./ModeService";
import { BattleMapService } from "./BattleMapService";
import { PlayModeService } from "./modebased/PlayModeService";
import { DrawingService } from "./modebased/DrawingService";
import { ManageTokenService } from "./modebased/ManageTokenService";
import { AssetService } from "./AssetService";
import { SaveSessionService } from "./SaveSessionService";

export interface Services {
  modeService: ModeService;
  battleMapService: BattleMapService;
  playModeService: PlayModeService;
  backgroundDrawingService: DrawingService;
  notesDrawingService: DrawingService;
  manageTokenService: ManageTokenService;
  assetService: AssetService;
  saveSessionService: SaveSessionService;
}
