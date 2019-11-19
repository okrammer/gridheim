import { BattleMapService } from "../BattleMapService";
import { combineLatest, Observable } from "rxjs";
import { distinctUntilChanged, takeUntil } from "rxjs/operators";
import { AbstractModeBasedService } from "../../../../services/AbstractModeBasedService";

export class ZoomModeService extends AbstractModeBasedService {
  constructor(private readonly battleMapService: BattleMapService) {
    super();
  }

  onActivate(): void {
    this.battleMapService.setTokenSelectable(false);
    this.battleMapService.setSquareSelectable(false);
    this.battleMapService.selectSquare(null);
    this.battleMapService.selectToken(null);
  }
}
